  import "./App.css";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import About from "./pages/about";

  export default function App() {
    const [models, setModels] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
      
      axios.get(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims`)
        .then(res => {
          const trims = res.data.Trims;
          setModels(trims);  
          setFilteredModels(trims);  
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    const handleInputChange = (event) => {
      const searchQuery = event.target.value.toLowerCase();
      setQuery(searchQuery);

      
      const filtered = models.filter(model => 
        model.model_name.toLowerCase().includes(searchQuery)
      );
      setFilteredModels(filtered);
    };

    return (
      <>
      
      <BrowserRouter>
        <Routes>
          <Route index element={<About />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

        <h1 className="site-title">CARS</h1>
        <div className="input-div">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="model-list">
          {filteredModels.map((model, index) => (
            <button key={index} className="model-item">
              {model.model_name}
            </button>
          ))}
        </div>
      </>
    );
  }


