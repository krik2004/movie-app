import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import { debounce } from 'lodash'
import { LoadingOutlined } from '@ant-design/icons'

import { Form, Input, Space, Spin, Tabs } from 'antd'

import themovieDbService from './services/themoviedb-service.js'
import MovieList from './components/movie-list'
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
    moviesRatedLocal: {},
    currentPage: 1,
    currentPageRateTab: 1,
    currentTabisMain: true,
  }

  searchRatedMovies = async (page) => {
    try {
      this.setState({ loading: true })
      const moviesRated = await this.movieService.getRatedMovies(page, this.state.guestSessionId).then((data) => {
        return data.results
      })
      const totalResultRated = await this.movieService.getRatedMovies(page, this.state.guestSessionId).then((data) => {
        return data.total_results
      })
      this.setState({ loading: false, moviesRated, totalResultRated }, () => {
      })
    } catch (error) {
      console.error(error)
    }
  }

  currentTabToggle = () => {
    this.setState((prevState) => ({ currentTabisMain: !prevState.currentTabisMain }))
  }

  handlePageChange = async (page) => {
    if (this.state.currentTabisMain) {
      this.setState({ currentPage: page }, () => {
      })
      try {
        this.setState({ loading: true }, () => {
        })
        const query = this.state.query
        const movies = await this.movieService.getResource(query, page).then((data) => {
          return data.results
        })
        this.setState({ movies, loading: false }, () => {})
      } catch (error) {
        this.setState({ loading: false })
        console.error(error)
      }
    } else {
      this.setState({ currentPageRateTab: page })
      try {
        this.setState({ loading: true })
        const query = this.state.query
        const movies = await this.searchRatedMovies(page).then((data) => {
          return data.results
        })
        this.setState({ movies, loading: false }, () => {})
      } catch (error) {
        this.setState({ loading: false })
        console.error(error)
      }
    }
  }

  handleRatedPageChange = async (page) => {
    const { guestSessionId } = this.state
    try {
      this.setState({ loading: true })
      const moviesRated = await this.movieService.getRatedMovies(page, guestSessionId).then((data) => {
        return data.results
      })
      this.setState({ moviesRated, loading: false }, () => {})
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
    }
  }
  debouncedSearch = debounce(async (query) => {
    try {
      this.setState({ loading: true })
      const movies = await this.movieService.getResource(query).then((data) => {
        return data.results
      })
      const totalResult = await this.movieService.getResource(query).then((data) => {
        return data.total_results
      })
      this.setState({ movies, totalResult, query, loading: false })
    } catch (error) {
      console.error(error)
    }
  }, 1000)

  handleSearch = (value) => {
    this.debouncedSearch(value)
  }

  handleRatingChange = async (id, value) => {
    try {
      await this.movieService.postRating(id, value, this.state.guestSessionId)
      let newRatedMovie = { ...this.state.moviesRatedLocal, [id]: value }
      this.setState({ moviesRatedLocal: newRatedMovie }, () => {})
    } catch (error) {
      console.error(error)
    }
  }

  async componentDidMount() {
    try {
      const genres = await themovieDbService.getGenres()
      this.setState({ genres })
    } catch (error) {
      console.error(error)
    }
    try {
      const guestSessionId = await this.movieService.fetchGuestSessionId()
      this.setState({ guestSessionId }, () => {})
    } catch (error) {
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
                  key: 1,
                  label: 'Search',
                  children: (
                    <Fragment>
                      <Form className="search-form" name="trigger" layout="vertical" autoComplete="off">
                        <Form.Item
                          hasFeedback
                          name="field_b"
                          validateDebounce={1000}
                          onChange={(e) => this.handleSearch(e.target.value)}
                        >
                          <Input placeholder="Type to search ..." />
                        </Form.Item>
                      </Form>
                      <MovieList
                        movies={this.state.movies}
                        moviesRated={this.state.moviesRated}
                        totalResult={this.state.totalResult}
                        moviesRatedLocal={this.state.moviesRatedLocal}
                        query={this.state.query}
                        handlePageChange={this.handlePageChange}
                        handleRatingChange={this.handleRatingChange}
                        searchRatedMovies={this.searchRatedMovies}
                        className="movie-list"
                        loading={this.state.loading}
                        currentPage={this.state.currentPage}
                        currentTabisMain={this.state.currentTabisMain}
                      />
                    </Fragment>
                  ),
                },
                {
                  key: 2,
                  label: 'Rated',
                  children: (
                    <MovieList
                      moviesRatedLocal={this.state.moviesRatedLocal}
                      movies={this.state.moviesRated}
                      moviesRated={this.state.moviesRated}
                      totalResult={this.state.totalResultRated}
                      handlePageChange={this.handlePageChange}
                      handleRatingChange={this.handleRatingChange}
                      searchRatedMovies={this.searchRatedMovies}
                      loading={this.state.loading}
                      currentPage={this.state.currentPage}
                      currentTabisMain={this.state.currentTabisMain}
                      currentPageRateTab={this.state.currentPageRateTab}
                    />
                  ),
                },
              ]}
              onChange={() => {
                this.searchRatedMovies()
                this.currentTabToggle()
              }}
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
