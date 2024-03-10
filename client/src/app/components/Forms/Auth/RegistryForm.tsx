import {FC, ReactNode, useEffect} from "react";
import {LoginFormProps} from "./AuthForm.model";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {ApiRegistration, ErrorResponse} from "../../../store/api/api.model";
import style from "../Forms.module.scss";
import {Input} from "../../../../assets/common/components/Fields";
import {Button} from "../../../../assets/common/components/Button";
import {useRegistrationMutation} from "../../../store/api/api";

export const RegistryForm: FC<LoginFormProps> = ({toggleModal}) => {
    const [registry, {isLoading, isSuccess, isUninitialized}] = useRegistrationMutation()
    const {
        register, handleSubmit, formState: {errors}, setError
    } = useForm()
    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            toggleModal()
            alert('Пользователь зарегистрирован\n Осуществите вход для продолжения работы')
        }
    }, [isUninitialized, isSuccess, toggleModal])
    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        const {login, name, password, passwordTwo} = formData
        if (password !== passwordTwo) {
            setError("passwordTwo", {
                type: "manual",
                message: 'Введённые пароли не совпадают',
            })
            return null
        }
        try {
            await registry({login, name, password: passwordTwo} as ApiRegistration).unwrap()
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
            <Input {...register('name', {
                required: 'Имя обязателено'
            })}
                   label={'Имя пользователя'}/>
            <Input {...register('password', {
                required: 'Пароль обязателен'
            })} label={'Пароль'} isPassword={true}/>
            <Input {...register('passwordTwo', {})} label={'Повторите Пароль'} isPassword={true}/>
            <div className={style.errorsBlocK}>
                {getErrors()}
            </div>
            <Button title={'Зарегистрироваться'} type={'primary'} loading={isLoading} buttonType={"submit"}/>
        </form>
    );
};
