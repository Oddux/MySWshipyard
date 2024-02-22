import '../styles/Card.css';

const Card = (props) => {
    const { ship } = props;
    return (
        <div className="card">
            <h3>{ship.model}</h3>
            <ul>
                <li>Starship Class: {ship.starshipClass}</li>
                <li>Manufacturer: {ship.manufacturers}</li>
                <li>Crew: {ship.crew}</li>
                <li>Passengers: {ship.passengers}</li>
                <li>Max Atmo Speed: {ship.maxAtmospheringSpeed}</li>
                <li>Megalight Per Hour: {ship.MGLT}</li>
                <li>Hyperdrive Rating: {ship.hyperdriveRating}</li>
                <li>Consumables endurance: {ship.consumables}</li>
                <li>Cargo Capacity: {ship.cargoCapacity}</li>
                <li>Total Length: {ship.length} meters</li>
            </ul>
        </div>
    );
};

export default Card;