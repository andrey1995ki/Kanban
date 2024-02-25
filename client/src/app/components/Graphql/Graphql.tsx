import style from './Graphql.module.scss'
import {Header} from "../Header";
import {useQuery} from "@apollo/client";
import {ALL_BOARD} from "../../graphql/query";
import {LoaderMain} from "../../../assets/common/components/Loader/LoaderMain";
import {FC, useState} from "react";
import {BranchLayout} from "./compinents/BranchLayout";
import {Layout} from "./compinents/Layout/Layout";
import {ApolloResult, ContextState} from "./Graphql.model";
import {notLastChild, selectOnContext} from "./Graphql.utils";
import {useBranch} from "../../../assets/common/hook/useBranch";
import {ContextMenu} from "./compinents/ContextMenu";
import {AddBoards} from "./compinents/Input/AddBoards";
import {LayoutTitle} from "./compinents/Layout/LayoutTitle";

export const Graphql: FC = () => {
    const {data, loading} = useQuery(ALL_BOARD)
    const {expanded, toggleExpanded} = useBranch()
    const [contextMenu, setContextMenu] = useState<ContextState>({x: 0, y: 0, show: false})
    const [addElem, setAddElem] = useState(false)
    if (loading) return <LoaderMain/>
    return (
        <div className={style.graphQlPage}>
            <Header/>
            <Layout>
                <LayoutTitle expanded={expanded} title={'Доски'} mainBranch={true} toggleExpanded={toggleExpanded}
                             setContextMenu={setContextMenu}/>
                <div className={style.branchBlock}>
                    {
                        expanded &&
                        data?.boards.map((board: ApolloResult, index: number) => (
                            <BranchLayout title={board.title} key={board.id} id={board.id}
                                          notLast={notLastChild(data?.boards.length, index)}/>))
                    }
                    {
                        addElem &&
                        <AddBoards hide={setAddElem}/>
                    }
                </div>
            </Layout>
            <ContextMenu setShowContext={(show) => setContextMenu((state) => ({...state, show: show}))}
                         contextState={contextMenu}>
                <button onClick={() => selectOnContext(() => setAddElem(true), setContextMenu)}>Добавить</button>
            </ContextMenu>
        </div>
    );
}
