import taskStyle from '../../../../../app/components/Task/Task.module.scss'
import style from '../Skeleton.module.scss'
import {getSkeletonArray} from "../Skeleton.utils";


export const SkeletonTask = () => {
    const skeletonArray = getSkeletonArray(4, <div
        className={`${taskStyle.task} ${style.task}`}/>, 'taskColumn')

    return (
        <>
            {skeletonArray}
        </>
    );
};
