export default class themovieDbService {
  state  
  async getResource() {
    const apiKey = '9e61f70586a2adfdc8d6cf29199b84da'
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => data.results)
      .catch((error) => console.error('Error fetching data:', error))
    return res
  }
}
