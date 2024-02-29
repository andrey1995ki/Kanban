/**
 * Сортировка результата запроса
 * @param response результат запроса
 * @param fieldSort поле по которому осуществляется сортировка
 */
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
