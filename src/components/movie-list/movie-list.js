import React, { Component } from 'react'
import { List } from 'antd'
import MovieCard from '../movie-card/movie-card'
import themovieDbService from '../../services/themoviedb-service.js'

const test = new themovieDbService()

export default class MovieList extends Component {
  movieService = new themovieDbService()

  constructor() {
    super(), this.updateMovies()
  }

  state = {
    movies: [
    ],
  }

  updateMovies() {
    this.movieService.getResource().then((data) => {
      console.log('date:', data)
      this.setState({ movies: data })
         console.log('state:', this.state)
    })
  }

  render() {
    const { movies } = this.state

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          itemLayout="horizontal"
          size="small"
          style={{ maxWidth: '950px', align: 'center' }}
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 6,
            position: 'bottom',
            align: 'center',
          }}
          dataSource={movies}
          renderItem={(item) => (
            <List.Item>
              <MovieCard item={item} />
            </List.Item>
          )}
          grid={{
            gutter: 3,
            xs: 1,
            sm: 4,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
        />
      </div>
    )
  }
}
