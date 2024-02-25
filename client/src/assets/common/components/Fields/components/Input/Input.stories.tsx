/* eslint-disable */
import {Meta, StoryObj} from "@storybook/react";
import {Input} from "./Input";
import '../../../../../../index.scss'

const input: Meta<typeof Input> = {
    title: "Components/Fields/Mutation",
    component: Input,
    tags: ['autodocs'],
    parameters: {
        controls: {exclude: ['min', 'max', 'maxLength', 'minLength', 'pattern']},
    },
    argTypes: {
        onChange: {
            description: 'Асинхронная функция отслеживающая изменения',
            control: false
        },
        onBlur: {
            description: 'Асинхронная функция',
            control: false
        },
        ref: {
            description: 'ссылка на элемент input',
            control: false,
            table:{
                type: { summary: 'ForwardRef<HTMLInputElement>' }
            }
        },
        name: {
            description: 'имя элемента в форме',
        },
        label: {
            description: 'Метка отображаемая над элементом',
            type: 'string'
        },
        errors: {
            description: 'Ошибка отображаемая под элементом',
            type: 'string'
        },
        placeholder: {
            description: 'Текст внутри элемента',
            type: 'string'
        },
        disabled: {
            description: 'Признак доступности редактирования элемента',
            type: 'boolean'
        },
        required: {
            description: 'Признак обязательности заполнения',
            type: 'boolean',
            defaultValue: {
                summary: 'false'
            },
        }

    }
};

export default input;
type Story = StoryObj<typeof Input>;

const InputPattern: Story = {
    render: function Render(args) {
        const {name, onChange, onBlur, ...props} = args
        return <Input name={name} onChange={async () => {
        }} onBlur={async () => {
        }} {...props}/>
    }
}

export const InputField: Story = {
    ...InputPattern,
    args: {
        name: '',
        label: '',
        errors: '',
        placeholder: '',
        disabled: false,
        required: false,
    }
};
export const InputWithArgs: Story = {
    ...InputPattern,
    args: {
        name: 'input',
        label: 'Метка элемента',
        errors: 'Ошибка элемента',
        placeholder: 'Текст внутри элемента',
        disabled: true,
        required: true,
    }
};
