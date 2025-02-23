import {React, useState, useEffect} from 'react'
import Search from './components/search'

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

  const fetchMovies = async () => {
    try{

    }catch(err){
      console.error('Error fetching movies:', err);
      setErrorMessage('Failed to fetch movies. Please try again later.');
  
  }
}

  useEffect(() => {},
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
        <h2>Movies</h2></section>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        
          
      </div>
  </main>
  )
}

export default App