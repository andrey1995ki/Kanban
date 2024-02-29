/* eslint-disable */
import {Button} from './Button';
import type {Meta, StoryObj} from '@storybook/react';
import {FaPlus} from "react-icons/fa";

const button: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'Текст внутри кнопки'
        },
        type: {
            options: ['primary', 'default'],
            control: {type: 'radio'},
            description: 'Цвет кнопки',
            defaultValue: {
                summary: 'default'
            },
        },
        icon: {
            control: false,
            description: 'Иконка отображаемая слева от текста',
            table: {
                type: {summary: 'ReactElement'}
            }

        },
        loading: {
            description: 'Иконка загрузки отображаемая справа от текста',
            defaultValue: {
                summary: false
            },
        },
        onClick: {
            control: false,
            description: 'Функция передаваемая на кнопку',
            disable: true
        },
        buttonType: {
            control: false,
            description: 'Тип кнопки (необходимы для корректного поведения форм)',
            defaultValue: {
                summary: 'button'
            },
        }
    },
};

export default button;
type Story = StoryObj<typeof Button>;

export const ButtonDefault: Story = {
    args: {
        title: 'Кнопка',
        type: 'default',
        loading: false,
    },
};
export const ButtonPrimary: Story = {
    args: {
        title: 'Кнопка',
        type: 'primary',
        loading: false,
    },
};
export const ButtonLoading: Story = {
    args: {
        title: 'Кнопка',
        type: 'primary',
        loading: true,
    },
};
export const ButtonWithIcon: Story = {
    args: {
        title: 'Кнопка',
        type: 'default',
        loading: false,
        icon: <FaPlus/>
    },
};

