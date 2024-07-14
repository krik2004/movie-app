import React, { Component } from 'react'
import { Tag } from 'antd'
import { MovieContext } from '../../index.js'
import PropTypes from 'prop-types'
import './movie-genreTags.css'

export default class MovieGenreTags extends Component {
  render() {
    const { genreIds } = this.props
    const maxGenresToShow = 3

    return (
      <MovieContext.Consumer>
        {({ genres }) => (
          <div>
            {genreIds.slice(0, maxGenresToShow).map((genreId) => {
              const genre = genres.find((genre) => genre.id === genreId)
              return (
                <Tag className="tag" key={genre.id}>
                  {genre.name}
                </Tag>
              )
            })}
          </div>
        )}
      </MovieContext.Consumer>
    )
  }
}

MovieGenreTags.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}
