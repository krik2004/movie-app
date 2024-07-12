import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Tag } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import { Image } from 'antd'
import { Alert } from 'antd'

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
    const { item } = this.props
    const { error } = this.state

    const posterURL = 'https://image.tmdb.org/t/p/w500/'
    const errorMesage = error ? <Alert type="error" message="Error" banner /> : null
    return (
      <Card
        style={{
          border: '1px solid #e8e8e8',
          // borderRadius: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Row style={{ height: '219px' }}>
          <Col span={8}>
            <Image
              width={130}
              src={`${posterURL}${item.poster_path}`}
              alt={item.title}
              preview={true}
              onLoad={this.handleImageLoaded}
              onError={(e) => {
                this.handleError()
              }}
              placeholder={
                <Space style={{ height: '219px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Spin indicator={<LoadingOutlined style={{ color: 'grey' }} spin />} size="large" />
                </Space>
              }
            />
            {errorMesage}
          </Col>

          <Col span={16}>
            <Card.Meta style={{ fontSize: '12px', margin: '8px' }} title={item.title} />
            <div style={{ fontSize: '12px', color: '#827E7E', margin: '8px' }}>
              {(item.release_date.length<4)?'unknown':format(new Date(item.release_date), 'MMMM d, yyyy')}
            </div>
            <Card.Meta style={{ fontSize: '12px', margin: '8px' }} description={this.shortenText(item.overview, 150)} />
            <Tag style={{ fontSize: '12px', margin: '8px' }}>item.tag</Tag>
          </Col>
        </Row>
      </Card>
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
  }),
}
