import database from "../utils/db";
import { delay } from "../utils/delay";

export default defineEventHandler(() => {
    return delay(database.getFrameworks({}), 1000);
});