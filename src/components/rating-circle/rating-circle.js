import React, { Component } from 'react'
import './rating-circle.css'
import PropTypes from 'prop-types'

let colorClass = 'rating-circle'

export default class RatingCircle extends Component {
  getBorderColor = () => {
    const { rating } = this.props

    switch (true) {
      case rating >= 7:
        return colorClass + ' green'
      case rating >= 5:
        return colorClass + ' yellow'
      case rating >= 3:
        return colorClass + ' orange'
      default:
        return colorClass + ' red'
    }
  }
  render() {
    const { rating } = this.props
    return (
      <div className={this.getBorderColor()}>
        <span className="rating-number"> {rating} </span>
      </div>
    )
  }
}
RatingCircle.propTypes = {
  rating: PropTypes.string,
}
