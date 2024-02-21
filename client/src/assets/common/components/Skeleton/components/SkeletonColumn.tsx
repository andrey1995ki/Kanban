import columnStyle from '../../../../../app/components/Columns/Columns.module.scss'
import style from '../Skeleton.module.scss'
import {SkeletonTask} from "./SkeletonTask";

export const SkeletonColumn = () => {
    return (
        <div className={columnStyle.column}>
            <div className={columnStyle.columnLayout}>
                <div className={`${columnStyle.titleColumn} ${style.titleColumn}`}/>
                <div className={columnStyle.tasks}>
                    <SkeletonTask/>
                </div>
            </div>
        </div>
    );
};
