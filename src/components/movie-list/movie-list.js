import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Space, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './movie-list.css'
import MovieCard from '../movie-card/movie-card'

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
      moviesRatedLocal,
      loading,
      currentPage,
      currentTabisMain,
      currentPageRateTab,
    } = this.props
    let currentListPage
    if (currentTabisMain) {
      currentListPage = currentPage
    } else {
      currentListPage = currentPageRateTab
    }
    return (
      <div className="move-list__container">
        {loading ? (
          <Space className="spinner__space-container">
            <Spin indicator={<LoadingOutlined className="spinner__loadingOutLined" spin />} size="large" />
          </Space>
        ) : (
          <List
            className="move-list"
            size="small"
            pagination={{
              showSizeChanger: false,
              onChange: (page) => this.handlePageChange(page),
              pageSize: 20,
              position: 'bottom',
              align: 'center',
              total: totalResult,
              current: currentListPage,
            }}
            dataSource={movies}
            renderItem={(item) => (
              <List.Item>
                <MovieCard
                  movieRatedLocal={moviesRatedLocal[item.id]}
                  key={item.id}
                  item={item}
                  handleRatingChange={handleRatingChange}
                  moviesRated={moviesRated}
                  searchRatedMovies={searchRatedMovies}
                  currentTabisMain={currentTabisMain}
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
        )}
      </div>
    )
  }
}
MovieList.propTypes = {
  movies: PropTypes.array,
  totalResult: PropTypes.number,
  query: PropTypes.string,
  handlePageChange: PropTypes.func,
  handleRatingChange: PropTypes.func,
  searchRatedMovies: PropTypes.func,
  moviesRated: PropTypes.array,
  handleRatedPageChange: PropTypes.func,
  moviesRatedLocal: PropTypes.object,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  currentPageRateTab: PropTypes.number,
  currentTabisMain: PropTypes.bool,
}
