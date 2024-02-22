import { ApolloClient, InMemoryCache, gql, useQuery, ApolloProvider} from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });

const useAllShips = () => {
    const { data, loading, error } = useQuery(getAllShips);
    return { data, loading, error };};

const getAllShips = gql`
    query getAllShips {
        allStarships {
            starships {
            id
            name
            model
            starshipClass
            manufacturers
            crew
            passengers
            maxAtmospheringSpeed
            MGLT
            hyperdriveRating
            consumables
            cargoCapacity
            length
            }
        }
    }`;

export { ApolloProvider };    
export { apolloClient };
export default useAllShips;