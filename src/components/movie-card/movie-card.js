  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { Card, Row, Col, Tag, Body } from 'antd'
  import { LoadingOutlined } from '@ant-design/icons'
  import { Space, Spin } from 'antd'
  import { Image } from 'antd'
  import { Alert } from 'antd'
  import { Flex, Rate } from 'antd'
  import { ConfigProvider } from 'antd'

  import RatingCircle from '../rating-circle/rating-circle.js'
  import MovieGenreTags from '../movie-genreTags/movie-genreTags.js'
  import './movie-card.css'
  import { MovieContext } from '../../index.js'

  import logo from '../../images/image1.jpg'

  export default class MovieCard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        imageLoaded: false,
        error: false,
      }
    }
    componentDidUpdate(prevProps) {
      if (prevProps.item.id !== this.props.item.id) {
        this.setState({ error: false })
      }
    }

    handleImageLoaded = () => {
      this.setState({ imageLoaded: true })
    }
    handleError = () => {
      this.setState({ error: true })
    }
    shortenText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text
      }
      const shortenedText = text.substr(0, text.lastIndexOf(' ', maxLength)) + ' ...'
      return shortenedText
    }

    render() {
      const { format } = require('date-fns')
      const { item, handleRatingChange, moviesRated, searchRatedMovies } = this.props
      const { error } = this.state
      const posterURL = 'https://image.tmdb.org/t/p/w500/'
      // console.log('moviesRated', moviesRated)
      // console.log(moviesRated)
      let currentUserRating
      if (moviesRated !== undefined && moviesRated.length > 0) {
        const foundMovie = moviesRated.find((ratedMovie) => ratedMovie.id === item.id)
        if (foundMovie) {
          currentUserRating = foundMovie.rating
          // console.log('rating совпал: ', currentUserRating)
        }
      }
      // console.log('для фильма: ', item.id)
      return (
        <MovieContext.Consumer>
          {({ genres }) => (
            <Card className="card">
              <div className="parent">
                <div className="poster-wrapper">
                  {error ? (
                    <img className="image-placeholder" src={logo} />
                  ) : (
                    <Image
                      className="movie-card__image"
                      src={`${posterURL}${item.poster_path}`}
                      preview={true}
                      onLoad={this.handleImageLoaded}
                      onError={(e) => {
                        this.handleError()
                      }}
                      placeholder={
                        <Space className="movie-card__space-spin">
                          <Spin
                            indicator={<LoadingOutlined className="movie-card__loading-spinner" spin />}
                            size="large"
                          />
                        </Space>
                      }
                    />
                  )}
                </div>
                <div className="head-wrapper">
                  <Card.Meta className="movie-card__card-meta-title" title={item.title} />
                  <RatingCircle rating={item.vote_average.toFixed(1)} />
                </div>
                <div className="releaseDate-wrapper">
                  <div className="date-info">
                    {item.release_date.length < 4 ? 'unknown' : format(new Date(item.release_date), 'MMMM d, yyyy')}
                  </div>
                </div>
                <div className="genreTags-wrapper">
                  <MovieGenreTags genreIds={item.genre_ids} className="genreTags-wrapper" />
                </div>
                <div className="card-description-wrapper">
                  <Card.Meta
                    className="movie-card__card-description"
                    description={this.shortenText(item.overview, 220)}
                  />
                </div>
                {/* <div>рейтинг: {currentUserRating || 0}</div> */}
                <div className="card-rate-wrapper">
                  <Rate
                    className="movie-card__rate"
                    // defaultValue={currentUserRating}
                    value={currentUserRating || 0}
                    count={10}
                    onChange={async (value) => {
                      await handleRatingChange(item.id, value)
                    }}
                  />
                </div>
              </div>
            </Card>
          )}
        </MovieContext.Consumer>
      )
    }
  }

  MovieCard.propTypes = {
    item: PropTypes.shape({
      avatar: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      tag: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      id: PropTypes.number,
      rating: PropTypes.number,
      genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
    handleRatingChange: PropTypes.func,
    moviesRated: PropTypes.array,
    searchRatedMovies: PropTypes.func,
  }
