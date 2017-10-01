import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs : [],
      loading: true,
    }
  } 

  //Example usin Axios to gather data from an API
  //axios automatically returns response in JSON
  componentDidMount(){
    this.performSearch();
  };

  performSearch = (query = "cats") => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
    .then(response => {
      this.setState({
        //first .data is the actual data axios returns in a get request. second .data is to access the data from the actual giphy call
        gifs: response.data.data,
        loading: false,
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  };


  // Example using Fetch to gather data from an API
  // componentDidMount(){
  //   //simple way to make web requests. uses js promises to handle results
  //   fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({ gifs : responseData.data });
  //     })
  //     .catch(error => {
  //       console.log("error fetching and parsing data", error);
  //     });
  // }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading)
            ?<p>Loading ... </p>
            : <GifList data={this.state.gifs}/>
          }
        </div>
      </div>
    );
  }
}
