import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    searchString: '',
    places: []
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSearch = (e) => {
    const { searchString } = this.state
    const url = 'http://localhost:5000/api/places'
    if (e.key === 'Enter') {
      return fetch(url, {
        body: JSON.stringify({ searchString }), // must match 'Content-Type' header
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
        .then(response => response.json())
        .then(result => this.setState({ searchString: '', places: result.data }))
    }
  }
  handlePriceLevel = (priceLevel) => {
    let result = ''
    for (let i = 0; i < priceLevel; i++) {
      result += "$"
    }
    return result
  }
  componentDidMount = () => {

  }
  render() {
    const { searchString, places } = this.state
    console.log(places)
    return (
      <div className='root'>
        <div className='inputForm'>
          <input name='searchString' value={searchString} onChange={this.handleChange} onKeyPress={this.handleSearch} />
        </div>
        <div className='container'>
          {places.map(place =>
            <div key={place.id} className='place'>
              <div className='title'>
                <h4>{place.name}</h4>
                <div>{this.handlePriceLevel(place.price_level)}</div>
                <div>{place.rating} stars</div>
              </div>
              <div className='content'>
                <div>{place.formatted_address}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
