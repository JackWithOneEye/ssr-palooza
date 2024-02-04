import database, { type Framework } from "~/server/utils/db";
import { delay } from "~/server/utils/delay";

export default defineEventHandler(async (event) => {
    const body: Framework = await readBody(event);
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'empty body',
        });
    }

    return delay(database.createFramework(body), 1000);
})