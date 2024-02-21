import {FC} from 'react';
import style from './Modal.module.scss'
import {ModalProps} from "./Modal.model";
import {GrClose} from "react-icons/gr";
import ReactDOM from "react-dom";

export const Modal: FC<ModalProps> = ({
                                          showModal,
                                          setShowModal,
                                          children,
                                          title
                                      }) => {
    return showModal ? ReactDOM.createPortal(
            <div className={style.modalLayout}>
                <div className={style.modal}>
                    <div className={style.closeModal} onClick={() => {
                        setShowModal()
                    }}><GrClose/></div>
                    <div>{title}</div>
                    <div className={style.children}>{children}</div>
                </div>
            </div>
            , document.body) :
        null
}
