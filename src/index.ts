type FileOptions = {
    type?: string
    lastModified?: number
}

class FileLike extends Blob {
    name: string
    lastModified: number
    
    constructor(blobParts, name: string, options: FileOptions = {}) {
        super(blobParts, options)
        this.name = name
        this.lastModified = options.lastModified || Date.now()
    }
}

export default FileLike