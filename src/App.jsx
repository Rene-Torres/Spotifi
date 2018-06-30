import React, { Component } from 'react';
import './style.css';
//import axios from 'axios';
import Profile from './Profile'
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Gallery from './Gallery';
console.log(process.env.REACT_APP_TOKEN)
//import Test from './Test'
const accessToken = process.env.REACT_APP_TOKEN;

class App extends Component {

state={
  query:"",
  artist: null,
  tracks:[]
}

search(){
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  let FETCH_URL = `${BASE_URL}q= ${this.state.query}&type=artist&limit=1`;
  const ALBUM_URL = 'https://api.spotify.com/v1/artists/';


var myOptions = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  },
  mode: 'cors',
  cache: 'default'
};

fetch(FETCH_URL, myOptions)
  .then(response => response.json())
  .then(json => {
const artist = json.artists.items[0];
this.setState({artist});

FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=MX&`
fetch(FETCH_URL,{
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  },
  mode: 'cors',
  cache: 'default'
})
.then(response => response.json())
.then(json=>{
  const tracks = json.tracks;
  this.setState({tracks});
})
  }) 
// axios.get(FETCH_URL)
//   .then(request =>{
//     console.log("request with axios", request)

//})
}


  render() {
    return (
      <div className="App">
            <div className="title">Spotifi App v1.0</div> 
              <FormGroup>
                <InputGroup>
                <FormControl 
                type="text" 
                placeholder="search artist..."
                query={this.state.query}
                onChange={event=> {this.setState({query: event.target.value})}}
                onKeyPress={event=>{
                  if(event.key === 'Enter'){
                    this.search();
                  }
                }}
                />
                  <InputGroup.Addon onClick={()=> this.search()}>
                  <Glyphicon glyph="search"></Glyphicon>
                  </InputGroup.Addon>
                </InputGroup>
                </FormGroup>
                { 
this.state.artist !== null 
?
<div>  
<Profile
artist= {this.state.artist}
/>
<Gallery
tracks={this.state.tracks}
/>
</div>

:
<div></div>}
              </div>
    );
  }
}

export default App;

