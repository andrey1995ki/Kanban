export const getTokenInCooke = (): string | undefined => {
    return document.cookie.match(/token=(.+?)(;|$)/)?.[1]
}
