import {FC, ReactNode, useEffect} from "react";
import {LoginFormProps} from "./AuthForm.model";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useLoginMutation} from "../../../store/api/api";
import style from "../Forms.module.scss";
import {Input} from "../../../../assets/common/components/Fields";
import {Button} from "../../../../assets/common/components/Button";
import {ApiLogin, ErrorResponse} from "../../../store/api/api.model";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {setUser} from "../../../store/user/user.slice";

export const LoginForm: FC<LoginFormProps> = ({toggleModal}) => {
    const [logon, {isLoading, isSuccess, isUninitialized}] = useLoginMutation()
    const dispatch = useDispatch<AppDispatch>()
    const {
        register, handleSubmit, formState: {errors}, setError
    } = useForm()
    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            toggleModal()
        }
    }, [isUninitialized, isSuccess, toggleModal])
    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        try {
            const {id, login, name, token} = await logon(formData as ApiLogin).unwrap()
            dispatch(setUser({id, login, name, token}))
        } catch (e) {
            setError("login", {
                type: "manual",
                message: (e as ErrorResponse).data.message,
            })
        }

    }
    const getErrors = () => {
        let arrayErrors: Array<ReactNode> = []
        for (const field in errors) {
            arrayErrors = [...arrayErrors, <span key={field}>{errors[field]?.message as string}</span>]
        }
        return arrayErrors
    }
    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('login', {
                required: 'Логин обязателен'
            })}
                   label={'Логин'}/>
            <Input {...register('password', {
                required: 'Пароль обязателен'
            })} label={'Пароль'} isPassword={true}/>
            <div className={style.errorsBlocK}>
                {getErrors()}
            </div>
            <Button title={'Войти'} type={'primary'} loading={isLoading} buttonType={"submit"}/>
        </form>
    );
};
