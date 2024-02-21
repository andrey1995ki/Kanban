import {FC} from 'react';
import columnStyle from '../../../../app/components/Columns/Columns.module.scss'
import {SkeletonProps} from "./Skeleton.model";
import {SkeletonColumn} from "./components/SkeletonColumn";
import {getSkeletonArray} from "./Skeleton.utils";

export const Skeleton: FC<SkeletonProps> = ({countColumn}) => {
    return (
        <div className={columnStyle.boards}>
            {getSkeletonArray(countColumn || 3, <SkeletonColumn/>, 'skeletonColumn')}
        </div>
    );
}
