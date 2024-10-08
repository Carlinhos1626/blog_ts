import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://head.agenciaplanner.dev/graphql', // Substitua pela URL do GraphQL do CMS
  cache: new InMemoryCache(),
});

export default client;
