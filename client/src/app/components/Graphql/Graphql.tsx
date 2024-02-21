import style from './Graphql.module.scss'
import {Header} from "../Header";
import {useQuery} from "@apollo/client";
import {ALL_BOARD, COLUMNS, CREATE_BOARD, CREATE_COLUMN} from "../../graphql/query";
import {LoaderMain} from "../../../assets/common/components/Loader/LoaderMain";
import {FC} from "react";
import {Branch} from "./compinents/Branch";
import {Layout} from "./compinents/Layout";
import {ApolloResult} from "./Graphql.model";

export const Graphql: FC = () => {
    const {data, loading} = useQuery(ALL_BOARD)
    if (loading) return <LoaderMain/>
    return (
        <div className={style.graphQlPage}>
            <Header/>
            <div className={style.layout}>
                <div className={style.content}>
                    <Layout title={'Доски'} inputType={CREATE_BOARD} dependentType={ALL_BOARD} mainBranch={true}
                            cacheParam={'boards'}
                            newParam={'newBoard'}
                    >
                        {data?.boards.map((board: ApolloResult) => (
                            <Branch title={board.title} key={board.id} id={board.id} filterKey={'board_id'}
                                    type={COLUMNS} inputType={CREATE_COLUMN}/>))}
                    </Layout>
                </div>
            </div>
        </div>
    );
}
