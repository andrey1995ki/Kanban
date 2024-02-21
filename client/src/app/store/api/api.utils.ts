export const sortResponse = <T, >(response: Array<T>, fieldSort: keyof T) => {
    return response.sort((a, b) => {
        if (a[fieldSort] > b[fieldSort]) {
            return 1;
        }
        if (a[fieldSort] < b[fieldSort]) {
            return -1;
        }
        return 0;
    })
}
