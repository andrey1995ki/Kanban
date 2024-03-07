import {FC} from 'react';
import style from './Sider.module.scss'
import {SiderComponentProps} from "./Sider.model";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {FaPlus} from "react-icons/fa6";
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";
import {SiderButton} from "./components/SiderButton";
import {FaEyeSlash} from "react-icons/fa";

export const SiderComponent: FC<SiderComponentProps> = (props) => {
    const {changeTheme, isDarkTheme, boards, activeBoards, setShowModal, setDisplaySider, isAuth} = props
    return (
        <div className={style.sider}>
            <div className={style.menu}>
                {
                    isAuth &&
                    <>
                        <div className={style.boardCount}>Все доски ({boards?.length || 0})</div>
                        <div className={style.boardsList}>
                            {
                                boards?.map((board) => {
                                    const isActiveBoard = board.id === activeBoards
                                    return <SiderButton active={isActiveBoard} board={board} key={board.id}/>
                                })
                            }
                        </div>
                        <div className={style.boardCreate} onClick={() => setShowModal()}>
                            <MdOutlineSpaceDashboard className={style.boardIcon}/>
                            <div className={style.boardCreateText}>
                                <FaPlus/>
                                Создать новую доску
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className={style.actions}>
                <div className={style.theme}><IoSunnyOutline/>
                    <label className={style.switch}>
                        <input type="checkbox" onChange={changeTheme} checked={isDarkTheme}/>
                        <span className={style.switchSlider}/>
                    </label>
                    <IoMoonOutline/>
                </div>
                <div className={style.hide} onClick={() => setDisplaySider(false)}>
                    <FaEyeSlash/>
                    <span>Скрыть панель</span>
                </div>
            </div>
        </div>
    );
};
