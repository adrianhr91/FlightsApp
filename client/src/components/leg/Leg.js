import React from 'react';
import './Leg.css';
import moment from 'moment';

class Leg extends React.Component {
  render() {
    const leg = this.props.model;

    return (
      <div className='leg'>
        <div className='leg-column-1'>
          <img className='carrier-logo' src={leg.carrierImageUrl} />
          <div className='leg-time'>
            <span className='time'>{ moment(new Date(leg.departureTime)).format('HH:mm')}</span>
            <span className='location'>{leg.originPlaceCode}</span>
          </div>
        </div>

        <div className='leg-column-1 arrow'>
          <img src='images/arrow.png' />
        </div>

        <div className='leg-column-1'>
          <div className='leg-time'>
            <span className='time'>
              {moment(new Date(leg.arrivalTime)).format('HH:mm')} 
              {this.getDayDifference(leg.departureTime, leg.arrivalTime)}
            </span> 
            <span className='location'>{leg.destinationPlaceCode}</span>
          </div>
        </div>

        <div className='leg-column-2 leg-duration'>
          <span className='duration'>{Math.floor(leg.duration / 60)}h {this.getDurationMinutes(leg.duration)}</span>
          <span>{this.getStopsText(leg.stopsCount)}</span>
        </div>
      </div>
    );
  }

  getDayDifference(departureTime, arrivalTime) {
    const daysDiff = this.dateDiffInDays(new Date(departureTime), new Date(arrivalTime)) 

    if(daysDiff > 0) {
      return <span className='day-diff'>(+{daysDiff})</span>
    } else {
      return null;
    }
  }

  dateDiffInDays(date1, date2) {
    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  }

  getDurationMinutes(duration) {
    var minutes = Math.floor(duration % 60);

    if (minutes < 10) {
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