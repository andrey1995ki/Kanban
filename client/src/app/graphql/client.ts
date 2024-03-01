import {ApolloClient, InMemoryCache} from '@apollo/client'

const url = import.meta.env.VITE_BASE_URL || ''
const port = import.meta.env.VITE_BASE_API_PORT || ''
const client = new ApolloClient({
    uri: `http://localhost${port}${url}/api/graphql`,
    cache: new InMemoryCache(),
})

export default client
