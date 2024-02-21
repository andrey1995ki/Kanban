import {ChangeEvent, FC, useState} from "react";
import {InputProps} from "../Graphql.model";
import {BsCheckSquareFill, BsXSquareFill} from "react-icons/bs";
import style from "../Graphql.module.scss";
import {useMutation} from "@apollo/client";
import {Loader} from "../../../../assets/common/components/Loader/Loader";

export const Input: FC<InputProps> = (props) => {
    const {type, value: initValue, hide, dependentType, cacheParam, newParam} = props
    const [value, setValue] = useState<string>(initValue || '')
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const [funcMutation, {loading}] = useMutation(type, {
        update(cache, {data}) {
            const cacheData = cache.readQuery({query: dependentType})
            console.log(cacheData)
            cache.writeQuery({
                query: dependentType,
                data: {
                    [cacheParam]: [data[newParam],...cacheData[cacheParam]]
                }
            })
        }

    })
    const submit = async () => {
        // const data = {
        //     title: value
        // }
        // if(idParam && id){
        //     data[idParam] = id
        // }
        await funcMutation({
            variables: {
                title: value
            }
        })
        hide(false)
    }
    return (
        <div className={style.input}>
            <input value={value} onChange={change}/>
            {
                loading ?
                    <Loader/>
                    : <BsCheckSquareFill className={style.icon} onClick={() => submit()}/>
            }
            <BsXSquareFill className={style.icon} onClick={() => hide(false)}/>
        </div>
    );
};
