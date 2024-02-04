import database, { type Framework } from "~/server/utils/db";
import { delay } from "~/server/utils/delay";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID not given',
        });
    }

    const body: Framework = await readBody(event);
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'empty body',
        });
    }

    return delay(database.updateFramework(parseInt(id, 10), body), 1000);
})