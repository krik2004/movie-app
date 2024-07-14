import React, { Component } from 'react'
import { Tag } from 'antd'
import { MovieContext } from '../../index.js'
import PropTypes from 'prop-types'

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
                <Tag
                  key={genre.id}
                  style={{ fontSize: '12px', marginLeft: '8px', marginRight: '0px', marginTop: '4px', gap: '0px' }}
                >
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
