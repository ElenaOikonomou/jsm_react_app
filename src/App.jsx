import {React, useState, useEffect} from 'react'
import Search from './components/search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';

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
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
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

    }catch(err){
      console.error('Error fetching movies:', err);
      setErrorMessage('Failed to fetch movies. Please try again later.');
  
  } finally{
    setIsLoading(false)
  
  }
}

  useEffect(() => {
    fetchMovies()
  },
  [])



  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>

          <img src="./hero.png" alt="Hero Banner"/>
          <h1>Find <span className='text-gradient'>Movies</span> You will Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all_movies">
        <h2 className='mt-[40px]'>All Movies</h2>
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