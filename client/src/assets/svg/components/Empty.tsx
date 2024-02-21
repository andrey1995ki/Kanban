import Empty from '../empty.svg?react'
import style from './Empty.module.scss'

export const EmptySvg = ({title}: { title: string }) => {
    return (
        <div className={style.emptyBlock}>
            <div className={style.empty}>
                <Empty/>
                <h4>{title}</h4>
            </div>
        </div>
    )
}
