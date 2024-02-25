import {InputLayout} from "./InputLayout";
import {FC, useRef} from "react";
import {EditItemProps} from "./Mutation.model";
import {useMutation} from "@apollo/client";

export const EditItem: FC<EditItemProps> = (props) => {
    const {id, hide, value, mutationType, param} = props
    const ref = useRef<HTMLInputElement>(null)
    const [funcMutation, {loading}] = useMutation(mutationType)
    const submit = async () => {
        await funcMutation({
            variables: {
                title: ref.current?.value,
                [param]: id
            }
        })
        hide(false)
    }
    return (
        <InputLayout loading={loading} submit={submit} hide={hide} value={value} ref={ref}/>
    );
};