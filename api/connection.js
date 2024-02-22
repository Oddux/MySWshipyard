import { ApolloClient, InMemoryCache, gql, useQuery, ApolloProvider} from '@apollo/client';
import seeds from './seeds.js';

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

function seedAllShips() {
    const { loading, error, data } = useAllShips();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data);
    const { allStarships } = data;
    

export { ApolloProvider };    
export { apolloClient };
export default useAllShips;