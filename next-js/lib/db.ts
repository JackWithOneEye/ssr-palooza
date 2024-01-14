import "server-only";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { delay } from "./delay";

const frameworks = pgTable('frameworks', {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    isPoop: boolean('ispoop').notNull()
});

export type Framework = typeof frameworks.$inferSelect;

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

    async getFrameworks() {
        return this.db.select().from(frameworks).orderBy(frameworks.name)
    }

    async getFramework(id: number) {
        const found = await this.db.select().from(frameworks).where(eq(frameworks.id, id));
        return found[0] as Framework | undefined;
    }

    async updateFramework(id: number, framework: typeof frameworks.$inferInsert) {
        return this.db.update(frameworks).set(framework).where(eq(frameworks.id, id)).returning();
    }
}

// @ts-expect-error
const database: Database = globalThis.database ?? new Database();

export default database;

if (process.env.NODE_ENV !== "production") {
    // @ts-expect-error
    globalThis.database = database;
}
