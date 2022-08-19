interface FileLike {

    readonly name: string

    readonly size: number

    readonly type: string

    readonly lastModified: number

    [Symbol.toStringTag]: string

    stream(): ReadableStream<Uint8Array>
}

interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number
}

class File extends Blob implements FileLike {
    static [Symbol.hasInstance](value: unknown): value is File {
        return value instanceof Blob
            // && value[Symbol.toStringTag] === 'File'
            && typeof (value as File).name === "string"
    }

    readonly #name: string

    readonly #lastModified: number = 0


    constructor(fileBits: BlobPart[], name: string, options: FilePropertyBag = {}) {
        super(fileBits, options)

        if (arguments.length < 2) {
            throw new TypeError(
                "Failed to construct 'File': 2 arguments required, "
                + `but only ${arguments.length} present.`
            )
        }

        this.#name = String(name)

        const lastModified = options.lastModified === undefined
            ? Date.now()
            : Number(options.lastModified)

        if (!Number.isNaN(lastModified)) {
            this.#lastModified = lastModified
        }
    }

    get name(): string {
        return this.#name
    }

    get webkitRelativePath(): string {
        return ""
    }

    get lastModified(): number {
        return this.#lastModified
    }

    get [Symbol.toStringTag](): string {
        return "File"
    }
}

export default File