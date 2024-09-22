import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const jsonData = JSON.parse(input);
    axios.post('http://localhost:3000/bfhl', jsonData)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const selectedData = selectedOptions.reduce((acc, option) => {
      switch (option) {
        case 'alphabets':
          return [...acc, ...alphabets];
        case 'numbers':
          return [...acc, ...numbers];
        case 'highest_lowercase_alphabet':
          return [...acc, ...highest_lowercase_alphabet];
        default:
          return acc;
      }
    }, []);

    return (
      <div>
        <h2>Response</h2>
        <ul>
          {selectedData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>SRM Institute of Science and Technology</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Select options</h2>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse
