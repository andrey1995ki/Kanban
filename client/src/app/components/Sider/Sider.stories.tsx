/* eslint-disable */
import {Meta, StoryObj} from "@storybook/react";
import '../../../index.scss'
import {SiderComponent} from "./Sider.component";
import React, {useState} from "react";
import style from "../MainLayout/MainLayout.module.scss";
import {AiOutlineMenuUnfold} from "react-icons/ai";

const sider: Meta<typeof SiderComponent> = {
    title: "Components/Sider",
    component: SiderComponent,
    tags: ['autodocs'],
    argTypes: {
        boards: {
            description: 'Массив досок',
            control: false,
            table: {
                type: {summary: 'Array<{id: string, title: string}>'}
            }
        },
        activeBoards: {
            description: 'Текущая активная доска',
            control: false,
        },
        changeTheme: {
            description: 'Функция отвечающая за смену темы',
            control: false,
            table: {
                type: {summary: 'function(e: ChangeEvent<HTMLInputElement>)'}
            }
        },
        isDarkTheme: {
            description: 'Признак что текущая тема тёмная',
            control: false,
        },
        setShowModal: {
            description: 'Функция вызывающая модальное окно добавления доски',
            control: false,
            table: {
                type: {summary: 'function()'}
            }
        },
        setDisplaySider: {
            description: 'Функция скрывающая меню',
            control: false,
            table: {
                type: {summary: 'function()'}
            }
        },

    }
}
export default sider;
type Story = StoryObj<typeof SiderComponent>;

const SiderPattern: Story = {
    render: function Render(args) {
        const {boards, activeBoards} = args
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const scheme = prefersDarkScheme ? "light-theme" : "dark-theme"
        const [isDarkTheme, setIsDarkTheme] = useState<boolean>(prefersDarkScheme)
        const [displaySider, setDisplaySider] = useState(true)
        const setShowModal = () => alert('Вызвано модальное окно добавления доски')
        const toggleTheme = () => {
            document.body.classList.toggle(scheme);
        }
        const changeTheme = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const checkedDark = e.target.checked
            setIsDarkTheme(checkedDark)
            toggleTheme()
        }
        return (
            <div className={style[`stDecorators${displaySider ? '--sider' : ''}`]}>
                {
                    displaySider ?
                        <SiderComponent changeTheme={changeTheme} isDarkTheme={isDarkTheme}
                                        setDisplaySider={setDisplaySider} setShowModal={setShowModal} boards={boards}
                                        activeBoards={activeBoards}/>
                        :
                        <div className={style.layout}>
                            <div className={style.content}>
                                <div onClick={() => setDisplaySider(true)} className={style.showSider}>
                                    <AiOutlineMenuUnfold/>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )


    }
}

export const SiderDefault: Story = {
    ...SiderPattern,
    args: {
        boards: [],
        activeBoards: undefined
    }
}
