import React from "react";
import PropTypes from "prop-types";
import "./App.css";

const Card = ({ title }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
    </div>
  );
};

 
Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function App() {
  return (
    <div className="card-container">
      <Card title="Lion King" rating={5} isCool={true}/>
      <Card title="Avatar" />
      <Card title="Snow White" />
    </div>
  );
}
