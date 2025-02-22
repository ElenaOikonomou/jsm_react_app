import React from 'react'
import Search from './components/Search.jsx';
 
const App = () => {
  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>

          <img src="./hero.png" alt="Hero Banner"/>
          <h1>Find <span className='text-gradient'>Movies</span> You will Enjoy Without The Hassle</h1>
        </header>
        
          <Search/>
  
      </div>
  </main>
  )
}

export default App