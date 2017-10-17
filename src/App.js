import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Yelp from './util/Yelp.js';

// const businesses = [business, business, business, business, business, business];

class App extends Component {

  constructor(){
    super()
    this.state = {businesses: []}
    this.searchYelp  = this.searchYelp.bind(this);
  }

    searchYelp(term,location,sortBy){
       Yelp.search(term,location,sortBy).then(businesses => { this.setState(businesses:businesses) })
    }



  // searchYelp(term,location,sortBy){
  //   Yelp.search(term,location,sortBy).then(businesses => { setState({businesses:businesses}) }
  // };





  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
          <SearchBar searchYelp={this.searchYelp} />
          <BusinessList businesses={this.businesses} />
        </div>

    );
  }
}

export default App;
