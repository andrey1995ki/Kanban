import {useSelector} from "react-redux";
import {AppSelector} from "../../../store/app/app.selector";
import {EditBoard} from "../../Forms/Board/EditBoard/EditBoard";
import {useState} from "react";
import style from '../Header.module.scss'

export const EditBoards = () => {
    const {boards} = useSelector(AppSelector)
    const [error, setError] = useState<string|undefined>(undefined)
    return (
        <div>
            {
                boards?.map(board=><EditBoard {...board} key={board.id} setError={setError}/>)
            }
            {
                error && <div className={style.errorEdit}>{error}</div>
            }
        </div>
    );
};
