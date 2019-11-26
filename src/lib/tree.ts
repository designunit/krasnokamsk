export function flatMapTree<T, N>(map: (node: N) => T, tree: N[], childrenKey: string = 'children'): T[] {
    let stack = tree
    const out: T[] = []

    while (true) {
        if (stack.length === 0) {
            break
        }

        const item = stack.pop()
        if (!item) {
            continue
        }

        const xs = item[childrenKey]
        if (Array.isArray(xs)) {
            stack = [...stack, ...xs]
        }

        out.push(map(item))
    }

    return out
}
