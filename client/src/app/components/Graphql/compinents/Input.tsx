import {ChangeEvent, FC, useState} from "react";
import {ApolloPayload, InputProps} from "../Graphql.model";
import {BsCheckSquareFill, BsXSquareFill} from "react-icons/bs";
import style from "../Graphql.module.scss";
import {useMutation} from "@apollo/client";
import {Loader} from "../../../../assets/common/components/Loader/Loader";

export const Input: FC<InputProps> = (props) => {
    const {type, value: initValue, hide, dependentType, cacheParam, newParam, idParam, id,} = props
    const [value, setValue] = useState<string>(initValue || '')
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    let variables = {}
    if (idParam && id) {
        variables = {"filter": {[idParam]: id}}
    }
    const [funcMutation, {loading}] = useMutation(type, {
        update(cache, {data}) {
            console.log(cache);
            const cacheData = cache.readQuery({query: dependentType, variables})
            console.log(cacheData[cacheParam], data[newParam])
            cache.writeQuery({
                query: dependentType,
                data: {
                    [cacheParam]: [...cacheData[cacheParam], data[newParam]]
                },
                variables
            })
        }
    })
    const submit = async () => {
        const data: ApolloPayload = {
            title: value
        }
        if (idParam && id) {
            data[idParam] = id
        }
        console.log(data);
        await funcMutation({
            variables: {
                ...data
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
