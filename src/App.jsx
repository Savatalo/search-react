import "./App.css";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState('');
  const [models, setModels] = useState([]);

  const getData = () => {
    axios.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=mercedes-benz`)
      .then(res => {
        setModels(res.data.Models);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleChange = (e) => {
    setInput(e.target.value);
    getData();
  }

  const stanko = () => {
    console.log('test')
  }

  return (
    <>
      <div className="site-title">
        <h1 className="tifosi">MERCEDES-BENZ</h1>
      </div>
      <div className="input-div">
        <input 
          onChange={handleChange} 
          type="text" 
          className="input"
          value={input}
        />
      </div>
      <div className="models-list">
        {models.filter(model => model.model_name.toLowerCase().includes(input.toLowerCase())).map((model, index) => (
          <div key={index} onClick={() => stanko()}>
            {model.model_name}
          </div>
        ))}
      </div>
    </>
  );
}



