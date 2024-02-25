import {FC, useRef} from 'react';
import {InputLayout} from "./InputLayout";
import {useMutation} from "@apollo/client";
import {AddItemProps} from "./Mutation.model";

export const AddSubElem: FC<AddItemProps> = (props) => {
    const {id, hide, filterParam, cacheParam, mutationType, cacheType, mutationName} = props
    const ref = useRef<HTMLInputElement>(null)
    const variables = {
        "filter": {[filterParam]: id}
    }
    const [funcMutation, {loading}] = useMutation(mutationType, {
        update(cache, {data}) {
            const cacheData = cache.readQuery({query: cacheType, variables}) || [{}]
            if (cacheData[cacheParam]) {
                cache.writeQuery({
                    query: cacheType,
                    data: {
                        [cacheParam]: [...cacheData[cacheParam], data[mutationName]]
                    },
                    variables
                })
            }
        }
    })
    const submit = async () => {
        await funcMutation({
            variables: {
                title: ref.current?.value,
                [filterParam]: id
            }
        })
        hide(false)
    }
    return (<InputLayout ref={ref} submit={submit} hide={hide} loading={loading}/>);
};
