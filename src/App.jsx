import {React, useState, useEffect} from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};




 
const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movieList, setMovieList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  //Debounce the search term to prevent making too many API calls
  //In this case, we're debouncing the searchTerm to 500ms (or 0.5s), by waiting the user to stop typing for 500 ms
  useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)

    try{
      const endpoint = query
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json()
      if(data.response === "false"){
        setErrorMessage(data.errorMessage || "Failed to fetch movies");
        setMovieList([])  
        return; //exit the function   

      }

      setMovieList(data.results || [])

      if(query && data.results.length>0) {
        await updateSearchCount(query, data.results[0])
      }

    }catch(err){
      console.error('Error fetching movies:', err);
      setErrorMessage('Failed to fetch movies. Please try again later.');
  
  } finally{
    setIsLoading(false)
  
  }
}

  const loadTrendingMovies = async () => {
    try {

      const movies = await getTrendingMovies()
      setTrendingMovies(movies)

    } catch(error){
      console.error(`Error fetching trending movies: &{error}`);
      
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  },
  [debouncedSearchTerm])

 useEffect(() => {
  loadTrendingMovies()
 }, [])

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>

          <img src="./hero.png" alt="Hero Banner"/>
          <h1>Find <span className='text-gradient'>Movies</span> You will Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length>0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) =>(
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
            ))}
            </ul>
          
          </section>
        )}

        <section className="all_movies">
        <h2 >All Movies</h2>
        {isLoading?(
          <p><Spinner/></p>):errorMessage?(
            <p className="text-red-500">{errorMessage}</p>
          ):(
            <ul>
             {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
             ))}
            </ul>
          )
        }
        
        </section>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        
          
      </div>
  </main>
  )
}

export default App