import {ChangeEvent, FC, useState} from "react";
import {ApolloPayload, InputProps} from "../Graphql.model";
import {BsCheckSquareFill, BsXSquareFill} from "react-icons/bs";
import style from "../Graphql.module.scss";
import {useMutation} from "@apollo/client";
import {Loader} from "../../../../assets/common/components/Loader/Loader";

export const Input: FC<InputProps> = (props) => {
    const {type, value: initValue, hide, dependentType, id, enumerate, requestType} = props
    const {DependsParam, NewParam, CacheParam} = enumerate
    const [value, setValue] = useState<string>(initValue || '')
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    let variables = {}
    if (DependsParam && id && !requestType) {
        variables = {"filter": {[DependsParam]: id}}
    }
    const [funcMutation, {loading}] = useMutation(type, {
        update(cache, {data}) {
            const cacheData = cache.readQuery({query: dependentType, variables}) || [{}]
            console.log(cacheData[CacheParam], data[NewParam])
            if (cacheData[CacheParam]) {
                cache.writeQuery({
                    query: dependentType,
                    data: {
                        [CacheParam]: [...cacheData[CacheParam], data[NewParam]]
                    },
                    variables
                })
            }
        }
    })
    const submit = async () => {
        const data: ApolloPayload = {
            title: value
        }
        if (DependsParam && id) {
            data[DependsParam] = id
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
