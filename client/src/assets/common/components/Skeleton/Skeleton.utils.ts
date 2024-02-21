import {ReactElement} from "react";

export const getSkeletonArray = (countItems: number, element: ReactElement, keyPref: string) => {
    let skeletonElem: Array<ReactElement> = []
    for (let i = 0; i < countItems; i++) {
        skeletonElem = [...skeletonElem, {...element, key: `${keyPref}_${i}`}]
    }
    return skeletonElem
}
