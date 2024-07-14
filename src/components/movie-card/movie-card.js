import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Tag, Body } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import { Image } from 'antd'
import { Alert } from 'antd'
import { Flex, Rate } from 'antd'

import RatingCircle from '../rating-circle/rating-circle.js'
import MovieGenreTags from '../movie-genreTags/movie-genreTags.js'
import './movie-card.css'
import { MovieContext } from '../../index.js'

export default class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
      error: false,
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
    const { item, handleRatingChange } = this.props
    const { error } = this.state
    const posterURL = 'https://image.tmdb.org/t/p/w500/'
    const errorMesage = error ? <Alert type="error" message="Error" banner /> : null

    return (
      <MovieContext.Consumer>
        {({ genres }) => (
          <Card>
            {/* <Card.Body style={{padding: '12px',}} > */}
            <Row>
              <Col span={8}>
                <Image
                  className="movie-card__image"
                  // style={{ width: '12px' }}
                  // width={130}
                  src={`${posterURL}${item.poster_path}`}
                  alt={item.title}
                  preview={true}
                  onLoad={this.handleImageLoaded}
                  onError={(e) => {
                    this.handleError()
                  }}
                  placeholder={
                    <Space className="movie-card__space-spin">
                      <Spin indicator={<LoadingOutlined className="movie-card__loading-spinner" spin />} size="large" />
                    </Space>
                  }
                />
                {errorMesage}
              </Col>
              <Col span={16} className="movie-card__col-content-container">
                {' '}
                <Row justify="space-between">
                  <Col style={{ marginLeft: '8px' }}>
                    <Card.Meta className="movie-card__card-meta-title" title={item.title} />
                  </Col>
                  <Col>
                    <RatingCircle rating={item.vote_average.toFixed(1)} />
                  </Col>
                </Row>
                <div style={{ fontSize: '12px', color: '#827E7E', marginLeft: '8px', marginTop: '0px' }}>
                  {item.release_date.length < 4 ? 'unknown' : format(new Date(item.release_date), 'MMMM d, yyyy')}
                </div>
                <MovieGenreTags genreIds={item.genre_ids} />
                <Card.Meta
                  className="movie-card__card-description"
                  style={{ fontSize: '12px', margin: '8px' }}
                  description={this.shortenText(item.overview, 150)}
                />
                <div style={{ marginTop: 'auto', marginLeft: '8px' }}>
                  <Rate
                    className="movie-card__rate"
                    defaultValue={item.rating}
                    count={10}
                    onChange={(value) => {
                      handleRatingChange(item.id, value)
                    }}
                  />
                </div>
              </Col>
            </Row>
            {/* </Card.Body> */}
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
}
