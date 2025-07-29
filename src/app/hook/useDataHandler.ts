export function useDataHandler() {

    const getNestedValue = (obj: any, path: String) => {
        return path.split('.').reduce((acc, part) => {
            if (Array.isArray(acc)) {
                return acc.map(item => item[part]).join(', ');
            }
            return acc && acc[part];
        }, obj);
    }


    function recursiveFind(data: any[], id: number | string): any | undefined {
        for (const item of data) {
            if (item.id === id) return item;
            if (item.children && item.children.length > 0) {
                const found = recursiveFind(item.children, id);
                if (found) return found;
            }
        }
        return undefined;
    }

    return {
        recursiveFind,
        getNestedValue
    };



}