import React from 'react';
import Leg from '../leg';
import './Itinerary.css';

class Itinerary extends React.Component {
  render() {
    const itinerary = this.props.model;
    return (
      <div className='itinerary'>
        <Leg model={itinerary.outboundLeg} />
        <Leg model={itinerary.inboundLeg} />

        <div className='booking-info'>
          <div className='price-info booking-info-column '>
            <span className='price'>£{Math.floor(itinerary.cheapetsPrice)}</span>
            <span className='agent'>{itinerary.cheapestAgenst}</span>
          </div>
          <div className='booking-info-column'>
            <a className='select-button' href="#">Select</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Itinerary;