export function time(seconds: number): Promise<void> {
    const miliseconds = seconds * 1000

    return new Promise<void >((resolve, reject) => {
        setTimeout(() => resolve(), miliseconds)
    })
}