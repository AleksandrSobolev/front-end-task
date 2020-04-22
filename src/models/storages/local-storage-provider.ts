export class LocalStorageProvider {
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    get<T = any>(key: string): T;
    get(key: string): any {
        const value = localStorage.getItem(key)
        try {
            return JSON.parse(value)
        }
        catch (e) {
            return value
        }
    }

    delete(key: string) {
        localStorage.removeItem(key)
    }
}

export const SessionStorage = new LocalStorageProvider();