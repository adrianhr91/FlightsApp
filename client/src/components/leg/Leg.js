import React from 'react';
import './Leg.css';

class Leg extends React.Component {
  render() {
		const leg = this.props.model;
		const departureDate = new Date(leg.departureTime);
		const arrivalDate = new Date(leg.arrivalTime);
    return (
      <div className='leg'>
				<div className='leg-column'>
        	<img className='carrier-logo' src={ leg.carrierImageUrl } />
					<div className='leg-time'>
						<span className='time'>{ departureDate.getHours() }:{ departureDate.getMinutes() }</span>
						<span className='location'>{ leg.originPlaceCode }</span>
					</div>
				</div>
				
				<div className='leg-column'>
					<img src='images/arrow.png' />
				</div>

				<div className='leg-column'>
					<div className='leg-time'>
						<span className='time'>{ arrivalDate.getHours() }:{ arrivalDate.getMinutes() }</span>
						<span className='location'>{ leg.destinationPlaceCode }</span>
					</div>
				</div>
				
				<div className='leg-column leg-duration'>
					<span>{ leg.duration }</span>
					<span> {leg.stopsCount } stop(s)</span>
				</div>
      </div>
    );
  }
}

export default Leg;