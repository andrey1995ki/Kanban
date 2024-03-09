import Cookies from "js-cookie";

export const getTokenInCooke = (): string | undefined => {
    return Cookies.get('token')
}
