import './App.scss'
import {Provider} from 'react-redux'
import {store} from "./app/store/store";
import {RouterProvider} from 'react-router-dom'
import {router} from "./app/routing/routing";
import {ApolloProvider} from "@apollo/client";
import client from "./app/graphql/client";

function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <RouterProvider router={router}/>
            </ApolloProvider>
        </Provider>
    )
}

export default App
