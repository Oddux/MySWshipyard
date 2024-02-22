import React from 'react';
import Card from './card.jsx';
import { useAllShips } from '../api/connection.js';

function Container() {
    const { loading, error, data } = useAllShips();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data);
    const { allStarships } = data;

    return (
        <div className="container">
            {allStarships.starships.map((ship) => (
                <Card key={ship.id}
                ship={ship} />
            ))}
        </div>
    );
}

export default Container;