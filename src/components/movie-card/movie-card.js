import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Tag } from 'antd'

export default class MovieCard extends Component {
  render() {
    const { item } = this.props

    return (
      <Card>
        <Row>
          <Col span={8}>
            <img src={item.avatar} alt={item.title} style={{ width: '100%' }} />
          </Col>
          <Col span={16}>
            <Card.Meta title={item.title} description={item.description} />
            <Tag style={{ fontSize: '12px', marginTop: '8px' }}>{item.tag}</Tag>
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
  }),
}
