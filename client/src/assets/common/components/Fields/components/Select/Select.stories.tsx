/* eslint-disable */
import {Meta, StoryObj} from "@storybook/react";
import {Select} from "./Select";
import '../../../../../../index.scss'


const select: Meta<typeof Select> = {
    title: "Components/Fields/Select",
    component: Select,
    tags: ['autodocs'],
    parameters: {
        controls: {exclude: ['min', 'max', 'maxLength', 'minLength', 'pattern', 'disabled',]},
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
            description: 'ссылка на элемент select',
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
        options: {
            description: 'Массив значений в формате',
            control: false,
            table:{
                type: { summary: 'Array<ReactElement>' }
            }
        },
        required: {
            description: 'Признак обязательности заполнения',
            type: 'boolean',
            defaultValue: {
                summary: 'false'
            },
        },
        value: {
            description: 'Значение по умолчанию',
            type: 'string',
            control: {type: 'select'},
            options: ['option1', 'option2', 'option3']
        }
    }
}
export default select;
type Story = StoryObj<typeof Select>;

const SelectPattern: Story = {
    render: function (args) {
        const optionsArr = [<option value={'option1'} key={'option1'}>option1</option>,
            <option value={'option12'} key={'option2'}>option2</option>,
            <option value={'option3'} key={'option3'}>option3</option>]
        const {name, onChange, onBlur, options, ...props} = args
        return <Select options={optionsArr} onChange={async () => {
        }} onBlur={async () => {
        }} name={name} {...props}/>
    }
}
export const SelectField: Story = {
    ...SelectPattern,
    args: {
        name: '',
        label: '',
        disabled: false,
        required: false,
        value: 'option1'
    }
};
