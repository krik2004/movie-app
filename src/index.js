import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import App1  from './components/movie-list'

class App extends Component {
  render() {
    return <App1 />
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)


    // const apiKey = '9e61f70586a2adfdc8d6cf29199b84da'
    // await fetch(
    //   `https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => data.results)
    //   .catch((error) => console.error('Error fetching data:', error))