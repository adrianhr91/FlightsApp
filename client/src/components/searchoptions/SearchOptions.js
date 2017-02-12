import React from 'react';
import './SearchOptions.css';

class SearchOptions extends React.Component {
  render() {
    return (
      <div className='search-options'>
        <div>
          <span className='place-code'>{ this.props.originPlaceCode }</span>
          <img src='/images/arrow-white.png' /> 
          <span className='place-code'>{ this.props.destinationPlaceCode }</span>
        </div>
        <div className='search-info'>
          { this.props.travellersCount } travellers, { this.props.cabinType }
        </div>
      </div>
    );
  }
}

export default SearchOptions;