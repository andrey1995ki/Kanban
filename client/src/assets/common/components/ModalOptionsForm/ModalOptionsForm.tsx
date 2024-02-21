import {useEffect} from 'react';
import style from '../../../../app/components/Forms/Forms.module.scss'
import {ModalOptionsFormProps} from "./ModalOptionsForm.model";
import {maxLengthValid} from "../../../../app/components/Forms/Forms.validation";
import {Loader} from "../Loader/Loader";
import {FaCheck, FaTimes} from "react-icons/fa";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {ElementChildren} from "../../../../app/components/Forms/Column/EditColumn/EditColumn.model";

export const ModalOptionsForm = <T, A = undefined>(props: ModalOptionsFormProps<T, A>) => {
    const {
        initialValue,
        paramName,
        isLoading,
        toggleEdit,
        setFormError,
        checkError,
        submit,
        childrenElements
    } = props
    const {
        register, handleSubmit, setFocus, formState: {errors}, setError
    } = useForm()
    const errorMessage = errors?.title?.message as string | undefined
    useEffect(() => {
        setFormError(errorMessage)
    }, [errorMessage, setFormError])
    useEffect(() => {
        setFocus(paramName)
    }, [paramName, setFocus])
    const onSubmit: SubmitHandler<FieldValues> = (formData) => {
        if (checkError && checkError(formData[paramName])) {
            if (formData[paramName] !== initialValue) {
                setError(paramName, {
                    type: "manual",
                    message: "Доска с таким именем уже существует",
                })
                return
            }
        }
        submit(formData as T)
    }
    const parseChildren = (elements: Array<ElementChildren<A>> | undefined) => {
        return elements?.map((elem, index) => (
            <label className={style.field} key={`${String(elem.name)}_${index}`}>
                <label className={style[elem.type]}>
                    <input type={elem.type} {...register(elem.name as string, {value: elem.initValue})}/>
                    <span className={style.inputSpan}/>
                </label>
                <span>{elem.label}</span>
            </label>
        )) || []
    }
    return (
        <form className={style.editBoard} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.editBoardText}>
                <input {...register(paramName, {
                    value: initialValue,
                    required: 'Название обязательно', maxLength: {...maxLengthValid(20)}
                })}/>
            </div>
            <button className={`${style.editBoardBtn} ${style.check}`} type={'submit'}>
                {isLoading ? <Loader/> : <FaCheck/>}
            </button>
            <button className={`${style.editBoardBtn} ${style.delete}`} type={'button'}
                    onClick={() => toggleEdit(false)}>
                <FaTimes/>
            </button>
            {
                childrenElements &&
                <div className={style.parametersEdit}>
                    {parseChildren(childrenElements)}
                </div>
            }
        </form>
    );
}
