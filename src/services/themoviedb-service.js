export default class themovieDbService {
  onError = (error) => {}

  async getResource(req, page=1) {
    console.log('getResource',page)
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
        console.log('консоль из сервиса:', data)
        return data
      })
      .catch(this.onError)
    return res
  }


  
}
