import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import MovieList from './components/movie-list'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Form, Input } from 'antd'
import themovieDbService from './services/themoviedb-service.js'
import { debounce } from 'lodash'
import { Space, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { Card, Tabs } from 'antd'
import { Fragment } from 'react'

import GuestSession from './services/guest-session.js'

export const MovieContext = React.createContext()
import './index.css'
class App extends Component {
  movieService = new themovieDbService()

  state = {
    movies: [],
    totalResult: 1,
    moviesRated: [],
    totalResultRated: 1,
    query: '',
    loading: false,
    guestSessionId: '',
    genres: [],
  }

  handlePageChange = async (page) => {
    try {
      this.setState({ loading: true })
      const query = this.state.query
      const movies = await this.movieService.getResource(query, page).then((data) => {
        console.log(data.results)
        return data.results
      })
      this.setState({ movies, loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
    }
  }
  debouncedSearch = debounce(async (query) => {
    try {
      const movies = await this.movieService.getResource(query).then((data) => {
        return data.results
      })
      const totalResult = await this.movieService.getResource(query).then((data) => {
        return data.total_results
      })
      this.setState({ movies, totalResult, query }, () => {
        console.log(this.state)
      })
    } catch (error) {
      console.error(error)
    }
  }, 1000)

  searchRatedMovies = async () => {
    console.log('при переходе ', this.state.guestSessionId)
    try {
      this.setState({ loading: true })
      const moviesRated = await this.movieService.getRatedMovies(1, this.state.guestSessionId).then((data) => {
        return data.results
      })
      const totalResultRated = await this.movieService.getRatedMovies(1, this.state.guestSessionId).then((data) => {
        return data.total_results
      })
      this.setState({ loading: false, moviesRated, totalResultRated }, () => {
        console.log('this.state', this.state)
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleSearch = (value) => {
    this.debouncedSearch(value)
  }

  async componentDidMount() {
    try {
      const genres = await themovieDbService.getGenres()
      // console.log('жанры фильмов:', genres)
      this.setState({ genres })
    } catch (error) {
      console.error(error)
    }
    // const service = new ThemovieDbService()

    try {
      const guestSessionId = await this.movieService.fetchGuestSessionId()
      this.setState({ guestSessionId }, () => {
        console.log('при регистрации гость айди', this.state.guestSessionId)
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleRatingChange = async (id, value) => {
    // console.log('id', id, 'value', value)
    try {
      this.setState({ loading: true })
      await this.movieService.postRating(id, value, this.state.guestSessionId)
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <Online>
          <GuestSession />
          <MovieContext.Provider value={this.state}>
            <Tabs
              defaultActiveKey="1"
              indicator={{
                size: 64,
              }}
              items={[
                {
                  key: '1',
                  label: 'Search',
                  children: (
                    <Fragment>
                      {/* Поиск */}
                      <Form className="search-form" name="trigger" layout="vertical" autoComplete="off">
                        <Form.Item
                          hasFeedback
                          name="field_b"
                          validateDebounce={1000}
                          onChange={(e) => {
                            // this.handleSearch1(e)
                            this.handleSearch(e.target.value)
                          }}
                          rules={[
                            {
                              min: 3,
                            },
                          ]}
                        >
                          <Input placeholder="Type to search ..." />
                        </Form.Item>
                      </Form>
                      {/* Поиск */}

                      {/* спинер */}
                      {this.state.loading && (
                        <Space className="spinner__space-container">
                          <Spin
                            indicator={
                              <LoadingOutlined className="spinner__loadingOutLined" spin />
                            }
                            size="large"
                          />
                        </Space>
                      )}
                      {/* спинер */}

                      {/* Список */}
                      <MovieList
                        movies={this.state.movies}
                        totalResult={this.state.totalResult}
                        query={this.state.query}
                        handlePageChange={this.handlePageChange}
                        handleRatingChange={this.handleRatingChange}
                      />
                      {/* Cписок  */}
                    </Fragment>
                  ),
                },
                {
                  key: '2',
                  label: 'Rated',
                  children: (
                    <MovieList
                      movies={this.state.moviesRated}
                      totalResult={this.state.totalResultRated}
                      handlePageChange={this.handlePageChange}
                      handleRatingChange={this.handleRatingChange}
                    />
                  ),
                },
              ]}
              onChange={this.searchRatedMovies}
              centered
            />
          </MovieContext.Provider>
        </Online>
        <Offline>
          <div>Отсутствует подключение к интернету. Пожалуйста, проверьте ваше подключение и попробуйте снова.</div>
        </Offline>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
