import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { and, eq, ilike } from "drizzle-orm";

const frameworks = pgTable('frameworks', {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    isPoop: boolean('ispoop').notNull()
});

export type Framework = typeof frameworks.$inferSelect;

export type FrameworksQueryParams = Partial<{
    orderBy: 'id' | 'name';
    filter: Partial<{
        name: string
        description: string;
        isPoop: boolean;
    }>
}>;

class Database {
    private db;

    constructor() {
        const queryClient = postgres("postgres://admin:admin@0.0.0.0:5432/palooza");
        this.db = drizzle(queryClient);
    }

    async createFramework(framework: typeof frameworks.$inferInsert) {
        const returning = await this.db.insert(frameworks).values(framework).returning();
        return returning[0];
    }

    async deleteFramework(id: number) {
        return this.db.delete(frameworks).where(eq(frameworks.id, id)).returning();
    }

    async getFrameworks({ orderBy = 'name', filter = {} }: FrameworksQueryParams) {
        const filters = [];
        if (filter.name) {
            filters.push(ilike(frameworks.name, `%${filter.name}%`))
        }
        if (filter.description) {
            filters.push(ilike(frameworks.description, `%${filter.description}%`))
        }
        if (typeof filter.isPoop === 'boolean') {
            filters.push(eq(frameworks.isPoop, filter.isPoop))
        }

        return this.db.select().from(frameworks).orderBy(frameworks[orderBy]).where(and(...filters));
    }

    async getFramework(id: number) {
        const found = await this.db.select().from(frameworks).where(eq(frameworks.id, id));
        return found[0] as Framework | undefined;
    }

    async updateFramework(id: number, framework: typeof frameworks.$inferInsert) {
        const returning = await this.db.update(frameworks).set(framework).where(eq(frameworks.id, id)).returning();
        return returning[0];
    }
}

const database = new Database();

export default database;
