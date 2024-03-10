/* eslint-disable */
import type {Meta, StoryObj} from '@storybook/react';
import {HeaderComponents} from "./Header.components";
import '../../../index.scss'
import {Options} from "../../../assets/common/components/Options";

const header: Meta<typeof HeaderComponents> = {
    title: "Components/Header",
    component: HeaderComponents,
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'Дочерний элемент отвечающий за опции',
            control: false,
            table: {
                type: {summary: 'ReactElement'}
            }
        },
        toggleModal: {
            description: 'Функция отвечающая за вызов модального окна',
            control: false,
            table: {
                type: {summary: 'function()'}
            }
        },
        navigate: {
            description: 'Функция отвечающая за перенаправление',
            control: false,
            table: {
                type: {summary: 'function()'}
            }
        },
        title: {
            description: 'Заголовок шапки',
        },
        showBtn: {
            description: 'Признак отвечающий за отображения кнопки создания задачи',
        },
    }
}

export default header;
type Story = StoryObj<typeof HeaderComponents>;

const HeaderPattern: Story = {
    args: {
        navigate: () => alert('Переход на главную страницу'),
        toggleModal: () => alert('Вызвано модальное окно'),
        children: <Options optionsArray={[{
            callback: () => alert('Действие 1'),
            title: 'Действие 1'
        }, {
            callback: () => alert('Действие 2'),
            title: 'Действие 2'
        }]}/>
    }
}

export const HeaderDefault: Story = {
    args: {
        ...HeaderPattern.args,
        title: '',
        showBtn: false,
        isAuth: true
    }
}
export const HeaderWithData: Story = {
    args: {
        ...HeaderPattern.args,
        title: 'Шапка',
        showBtn: true,
        isAuth: true
    }
}
export const HeaderWithoutAuth: Story = {
    args: {
        ...HeaderPattern.args,
        title: '',
        showBtn: false,
        isAuth: false
    }
}
