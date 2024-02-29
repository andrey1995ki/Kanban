/* eslint-disable */
import {Meta, StoryObj} from "@storybook/react";
import '../../../../../../index.scss'
import {TextArea} from "./TextArea";

const textArea: Meta<typeof TextArea> = {
    title: "Components/Fields/TextArea",
    component: TextArea,
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
            description: 'ссылка на элемент textArea',
            control: false,
            table: {
                type: {summary: 'ForwardRef<HTMLInputElement>'}
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
}
export default textArea;
type Story = StoryObj<typeof TextArea>;
const TextAreaPattern: Story = {
    render: function Render(args) {
        const {name, onChange, onBlur, ...props} = args
        return <TextArea name={name} onChange={async () => {
        }} onBlur={async () => {
        }} {...props}/>
    }
}

export const TextAreaField: Story = {
    ...TextAreaPattern,
    args: {
        name: '',
        label: '',
        errors: '',
        placeholder: '',
        disabled: false,
        required: false,
    }
};
export const TextAreaWithArgs: Story = {
    ...TextAreaPattern,
    args: {
        name: 'textArea',
        label: 'Метка элемента',
        errors: 'Ошибка элемента',
        placeholder: 'Текст внутри элемента',
        disabled: true,
        required: true,
    }
};
