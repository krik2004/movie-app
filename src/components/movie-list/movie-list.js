  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { List } from 'antd'
  import MovieCard from '../movie-card/movie-card'
  import './movie-list.css'

  export default class MovieList extends Component {
    handlePageChange = (page) => {
      this.props.handlePageChange(page)
    }
    render() {
      const {
        movies,
        totalResult,
        handleRatingChange,
        searchRatedMovies,
        moviesRated,
      } = this.props
      return (
        <div className="move-list__container">
          <List
            className="move-list"
            size="small"
            pagination={{
              showSizeChanger: false,
              onChange: (page) => {
                this.handlePageChange(page)
              },
              pageSize: 20,
              position: 'bottom',
              align: 'center',
              total: totalResult,
            }}
            dataSource={movies}
            renderItem={(item) => (
              <List.Item>
                <MovieCard
                  item={item}
                  handleRatingChange={handleRatingChange}
                  moviesRated={moviesRated}
                  searchRatedMovies={searchRatedMovies}
                />
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
    searchRatedMovies: PropTypes.func,
    moviesRated: PropTypes.array,
    handleRatedPageChange: PropTypes.func,
  }
