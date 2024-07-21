export default class ThemovieDbService {
  // #guestSessionId = '1'
  // handleGuestSessionIdChange(guestSessionId) {
  //   console.log('guestSessionId была:', this.#guestSessionId)
  //   this.#guestSessionId = guestSessionId
  //   console.log('guestSessionId стала текущая:', this.#guestSessionId)
  // }

  onError = (error) => {}

  async fetchGuestSessionId() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTYxZjcwNTg2YTJhZGZkYzhkNmNmMjkxOTliODRkYSIsIm5iZiI6MTcyMDUzNDcxOC44ODYxNzMsInN1YiI6IjY2NzdjNTRhOGM4MGJhM2NjOWIwYjExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fn9u0AvzVserrxSoPcUVuuoj2iAM1aqhk1Dsve7gVIo',
      },
    }
    return fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      .then((response) => response.json())
      .then((data) => data.guest_session_id)
      .catch((err) => console.error(err))
  }

  static getGenres = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTYxZjcwNTg2YTJhZGZkYzhkNmNmMjkxOTliODRkYSIsIm5iZiI6MTcyMDUzNDcxOC44ODYxNzMsInN1YiI6IjY2NzdjNTRhOGM4MGJhM2NjOWIwYjExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fn9u0AvzVserrxSoPcUVuuoj2iAM1aqhk1Dsve7gVIo',
      },
    }
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      const data = await response.json()
      return data.genres
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async getResource(req, page = 1) {
    const apiKey = '9e61f70586a2adfdc8d6cf29199b84da'
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${req}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Not found ! error 404')
        }
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        return data
      })
      .catch(this.onError)
    return res
  }


  async postRating(id, value, guestSessionId) {
    // console.log('guestSessionId ОБНОВЛЕН С APP:', guestSessionId)
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTYxZjcwNTg2YTJhZGZkYzhkNmNmMjkxOTliODRkYSIsIm5iZiI6MTcyMDUzNDcxOC44ODYxNzMsInN1YiI6IjY2NzdjNTRhOGM4MGJhM2NjOWIwYjExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fn9u0AvzVserrxSoPcUVuuoj2iAM1aqhk1Dsve7gVIo',
      },
      body: JSON.stringify({ value: value }),
    }
    // console.log(options, 'для фильма с ид', id, ' и рейтингом', value, 'this.guestSessionId', guestSessionId)
 return fetch(`https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`, options)
   .then((response) => response.json())
   .then((response) => {
    //  console.log('ответ сервера по запросу на изменение рейтинга:', response)
     if (response.success) {
       return response // Возвращаем успешный ответ
     } else {
       throw new Error('Не удалось применить рейтинг')
     }
   })
   .catch((err) => {
     console.error(err)
     throw err // Пробрасываем ошибку дальше
   })

  }

  async getRatedMovies(page = 1, guestSessionId) {
    // console.log('guestSessionId стала TAB2:', guestSessionId)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTYxZjcwNTg2YTJhZGZkYzhkNmNmMjkxOTliODRkYSIsIm5iZiI6MTcyMDUzNDcxOC44ODYxNzMsInN1YiI6IjY2NzdjNTRhOGM4MGJhM2NjOWIwYjExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fn9u0AvzVserrxSoPcUVuuoj2iAM1aqhk1Dsve7gVIo',
      },
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    )
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .catch((err) => console.error(err))
    return res
  }
}
