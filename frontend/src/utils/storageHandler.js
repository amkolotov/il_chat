class LocalstorageHelper {
    set(item) {
        localStorage.setItem(item.key, item.value)
    }

    setMany(items) {
        items.forEach(item => {
            this.set(item)
        })
    }

    get(key) {
        return localStorage.getItem(key)
    }

    getMany(keys){
        const results = []

        keys.forEach(key => {
            const item = this.get(key)

            if (item) {
                results.push(item)
            }
        })

        return results
    }
}

export default new LocalstorageHelper()