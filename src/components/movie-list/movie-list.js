import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import MovieCard from '../movie-card/movie-card'
// import themovieDbService  from '../../services/themoviedb-service.js'

// const test = new themovieDbService()

export default class MovieList extends Component {
  // movieService = new themovieDbService()

  handlePageChange = (page) => {
    this.props.handlePageChange(page)
  }

  render() {
    const { movies, totalResult, handlePageChange, handleRatingChange } = this.props
    // console.log('movies', movies)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          itemLayout="horizontal"
          size="small"
          style={{ maxWidth: '950px', align: 'center' }}
          pagination={{
            showSizeChanger: false,
            onChange: (page) => {
              this.handlePageChange(page)
            },
            // onChange: (page) => {
            //   console.log(page)
            // },
            pageSize: 20,
            position: 'bottom',
            align: 'center',
            total: totalResult,
          }}
          dataSource={movies}
          renderItem={(item) => (
            <List.Item>
              <MovieCard item={item} handleRatingChange={handleRatingChange} />
            </List.Item>
          )}
          grid={{
            gutter: 0,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
        />
      </div>
    )
  }
}
MovieList.propTypes = {
  movies: PropTypes.array,
  totalResult: PropTypes.number.isRequired,
  query: PropTypes.string,
  handlePageChange: PropTypes.func,
  handleRatingChange: PropTypes.func,
}
