export async function delay<T>(p: Promise<T>, millis: number) {
    const r = await p;
    return await new Promise<T>((res) => void setTimeout(() => res(r), millis));
}