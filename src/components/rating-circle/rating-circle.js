import React, { Component } from 'react'
import './rating-circle.css'
import PropTypes from 'prop-types'

export default class RatingCircle extends Component {
  getBorderColor = () => {
    const { rating } = this.props
    switch (true) {
      case rating >= 7:
        return '#66E900'
      case rating >= 5:
        return '#E9D100'
      case rating >= 3:
        return '#E97E00'
      default:
        return 'red'
    }
  }
  render() {
    const { rating } = this.props
    return (
      <div className="rating-circle" style={{ borderColor: this.getBorderColor() }}>
        <span className="rating-number"> {rating} </span>
      </div>
    )
  }
}
RatingCircle.propTypes = {
  rating: PropTypes.string,
}
