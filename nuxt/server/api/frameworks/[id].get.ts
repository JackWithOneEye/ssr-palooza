import database from "~/server/utils/db";
import { delay } from "~/server/utils/delay";

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id');
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID not given',
        })
    }

    return delay(database.getFramework(parseInt(id, 10)), 1000);
})