import React from 'react';
import './SearchOptions.css';

class SearchOptions extends React.Component {
  render() {
    return (
      <div>
        <div className='search-summary'>
          <div>
            <span className='place-code'>{ this.props.originPlaceCode }</span>
            <img src='/images/arrow-white.png' /> 
            <span className='place-code'>{ this.props.destinationPlaceCode }</span>
          </div>
          <div className='search-info'>
            { this.props.travellersCount } travellers, { this.props.cabinType }
          </div>
        </div>

        <div className='search-options'>
            <span className='option'>Filter</span>
            <span className='option'>Sort</span>
            <span className='alert'>
              <img className='alert-img' src='/images/alert.png' />
              Price Alert
            </span>
        </div>
      </div>
    );
  }
}

export default SearchOptions;