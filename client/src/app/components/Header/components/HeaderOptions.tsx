import {EditBoards} from "./EditBoards";
import {Options} from "../../../../assets/common/components/Options";
import {FC, useState} from "react";
import {useModal} from "../../../../assets/common/hook/useModal";
import {HeaderOptionsModal, HeaderOptionsProps} from "../Header.model";
import {Modal} from "../../../../assets/common/components/Modal";
import {EditColumns} from "./EditColumns";
import {OptionsArray} from "../../../../assets/common/components/Options/Options.model";

export const HeaderOptions: FC<HeaderOptionsProps> = ({showBtn}) => {
    const [modalContent, setModalContent] = useState<HeaderOptionsModal>({title: '', child: <></>})
    const {showModal, toggleModal} = useModal()
    const setModalData = (param: HeaderOptionsModal) => {
        setModalContent(param)
        toggleModal()
    }
    let headerOptions: Array<OptionsArray> = [{
        callback: () => setModalData({title: 'Настрйка досок', child: <EditBoards/>}),
        title: 'Настрйка досок'
    }]
    if (showBtn) {
        headerOptions = [...headerOptions, {
            callback: () => setModalData({title: 'Настрйка колонок', child: <EditColumns/>}),
            title: 'Настрйка колонок'
        }]
    }
    return (
        <>
            <Options optionsArray={headerOptions}/>
            <Modal showModal={showModal} setShowModal={toggleModal} title={modalContent.title}>
                {modalContent.child}
            </Modal>
        </>
    )
}
