import React from 'react';
import './Leg.css';
import moment from 'moment';

class Leg extends React.Component {
  render() {
		const leg = this.props.model;
		
    return (
      <div className='leg'>
				<div className='leg-column'>
        	<img className='carrier-logo' src={ leg.carrierImageUrl } />
					<div className='leg-time'>
						<span className='time'>{ moment(leg.departureTime).format('hh:mm') }</span>
						<span className='location'>{ leg.originPlaceCode }</span>
					</div>
				</div>
				
				<div className='leg-column'>
					<img src='images/arrow.png' />
				</div>

				<div className='leg-column'>
					<div className='leg-time'>
						<span className='time'>{ moment(leg.arrivalTimearrivalDate).format('hh:mm') }</span>
						<span className='location'>{ leg.destinationPlaceCode }</span>
					</div>
				</div>
				
				<div className='leg-column leg-duration'>
					<span>{ Math.floor(leg.duration / 60) }h { this.getDurationMinutes(leg.duration)}</span>
					<span> {leg.stopsCount } stop(s)</span>
				</div>
      </div>
    );
  }

	getDurationMinutes(duration) {
		var minutes = Math.floor(duration % 60);

		if(minutes < 10) {
			minutes = '0' + minutes;
		}

		return minutes;
	}
}

export default Leg;