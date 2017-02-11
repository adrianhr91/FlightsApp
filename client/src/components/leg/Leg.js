import React from 'react';
import './Leg.css';

class Leg extends React.Component {
  render() {
		const leg = this.props.model;
		const departureDate = new Date(leg.departureTime);
		const arrivalDate = new Date(leg.arrivalTime);
    return (
      <div className='leg'>
        <img className='carrier-logo' src={ leg.carrierImageUrl } />
				<span>{ departureDate.getHours() }:{ departureDate.getMinutes() }</span>
				<span>{ leg.originPlaceCode }</span>
				<img src='images/arrow.png' />
				<span>{ arrivalDate.getHours() }:{ arrivalDate.getMinutes() }</span>
				<span>{ leg.destinationPlaceCode }</span>
				|
				<span>{ leg.duration }</span>
				<span> {leg.stopsCount } stop(s)</span>
      </div>
    );
  }
}

export default Leg;