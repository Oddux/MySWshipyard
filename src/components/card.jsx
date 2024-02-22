import React from 'react';
import './card.css';

const Card = (props) => {
    const { ship } = props;
    switchModeHandler = () => {
        this.setState(prevState => {
            return {isOwned: !prevState.isOwned};
        })
        
        if (!this.state.isOwned) {    
             requestBody = {
                query: `
                    mutation {
                        buyShip(shipId: "${ship.id}") {
                            pilotId
                            ownedShips {
                                shipId
                            }
                        }
                    }
                `
            };

        } else {
             requestBody = {
                query: `
                    mutation {
                        sellShip(shipId: "${ship.id}") {
                            pilotId
                            ownedShips {
                                shipId
                            }
                        }
                    }
                `
            };
        }

        fetch('http://localhost:8000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
              'Content-Type': 'application/json'
          }
   })};

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
            <div className="card-footer">
                <button type="button" onClick={this.switchModeHandler}>{this.state.isOwned ? 'Buy Ship' : 'Sell Ship'} </button>
            </div>
        </div>
    );
};

export default Card;