import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./App.css";

const Card = ({ title }) => {
  const [count, setCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(()=> {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked])

  
  return (
    <div className="card" onClick={()=> setCount((prevState) => prevState + 1)}>
      <h2>{title} <br/> {count? count : null}</h2> {/* conditional rendering*/}
      
      
      <button onClick= {()=>setHasLiked((prevState) => !prevState)}>
        {hasLiked ? "Liked" : "Like"}
      </button>
    </div>
  );
};


Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function App() {
  return (
    <div className="card-container">
      <Card title="Lion King" />
      <Card title="Avatar" />
      <Card title="Snow White" />
    </div>
  );
}
