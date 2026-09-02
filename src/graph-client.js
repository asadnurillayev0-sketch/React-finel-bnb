import {setContext} from "@apollo/client/link/context"
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"



const httpLink = createHttpLink({
uri: "https://airbnb-clone-backend-qii5.onrender.com/graphql"
})

const authLink = setContext((_, {headers}) => {
    const token = JSON.parse(localStorage.getItem("auth")).state.accesToken;

    return{
        headers: {...headers, authorization: token ? `Bearer ${token}` : ""}
    };
});

export const graphqlClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})