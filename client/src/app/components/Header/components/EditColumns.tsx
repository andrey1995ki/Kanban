import {useSelector} from "react-redux";
import {AppSelector} from "../../../store/app/app.selector";
import {useState} from "react";
import style from '../Header.module.scss'
import {EditColumn} from "../../Forms/Column/EditColumn/EditColumn";

export const EditColumns = () => {
    const {columns} = useSelector(AppSelector)
    const [error, setError] = useState<string | undefined>(undefined)
    return (
        <div>
            {
                columns?.map(column => <EditColumn {...column} key={column.id} setError={setError}/>)
            }
            {
                error && <div className={style.errorEdit}>{error}</div>
            }
        </div>
    );
};
