import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../components/MainLayout";
import {ColumnsWrapper} from "../components/Columns/Columns.wrapper";
import {ErrorPage} from "../components/ErrorPage";
import {MainPage} from "../components/MainPage";
import {Graphql} from "../components/Graphql";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout children={<MainPage/>}/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/graphql',
        element: <Graphql/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/boards/:boardId',
        element: <MainLayout children={<ColumnsWrapper/>}/>,
        errorElement: <ErrorPage/>
    }
],
    {
        basename: '/kanban'
    })
