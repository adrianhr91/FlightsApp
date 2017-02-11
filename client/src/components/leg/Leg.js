import React from 'react';
import './Leg.css';
import moment from 'moment';

class Leg extends React.Component {
  render() {
		const leg = this.props.model;
		
    return (
      <div className='leg'>
				<div className='leg-column-1'>
        	<img className='carrier-logo' src={ leg.carrierImageUrl } />
					<div className='leg-time'>
						<span className='time'>{ moment(leg.departureTime).format('hh:mm') }</span>
						<span className='location'>{ leg.originPlaceCode }</span>
					</div>
				</div>
				
				<div className='leg-column-1 arrow'>
					<img src='images/arrow.png' />
				</div>

				<div className='leg-column-1'>
					<div className='leg-time'>
						<span className='time'>{ moment(leg.arrivalTimearrivalDate).format('hh:mm') }</span>
						<span className='location'>{ leg.destinationPlaceCode }</span>
					</div>
				</div>
				
				<div className='leg-column-2 leg-duration'>
					<span className='duration'>{ Math.floor(leg.duration / 60) }h { this.getDurationMinutes(leg.duration)}</span>
					<span>{ this.getStopsText(leg.stopsCount) }</span>
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

	getStopsText(stopsCount) {
		let text;

		switch (stopsCount) {
			case 0:
				text = <span className='direct-flight'>Direct</span>
				break;
			case 1:
				text = <span className='non-direct-flight'>1 stop</span>
				break;
			default:
				text = <span className='non-direct-flight'>{stopsCount} stops</span>
				break;
		}

		return text;
	}
}

export default Leg;