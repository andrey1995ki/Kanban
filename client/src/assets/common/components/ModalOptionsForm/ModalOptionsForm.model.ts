import {ElementChildren} from "../../../../app/components/Forms/Column/EditColumn/EditColumn.model";

export interface ModalOptionsFormProps<T, A> {
    initialValue: string
    paramName: string
    isLoading: boolean
    toggleEdit: (edit: boolean) => void
    setFormError: (error: string | undefined) => void
    checkError?: (param: string) => boolean
    submit: (payload: T) => void
    childrenElements?: Array<ElementChildren<A>>
}
