import React from "react"
import "./App.css"

function Card({title]){
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export default function App() {
return(
  <div>
    <Card title="Lion King"/>
  
    <Card title="Cinderella"/>
 
    <Card title="Snow White"/>
  </div>
  
  
)
}
