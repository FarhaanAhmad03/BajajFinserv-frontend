

import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // We'll update this later

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post(`${API_URL}/bfhl`, parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid input or API error');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        <h2>Response:</h2>
        {selectedOptions.includes('Alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedOptions.includes('Numbers') && (
          <p>Numbers: {response.numbers.join(', ')}</p>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <p>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL App</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
          rows={5}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {response && (
        <div>
          <h2>Select options to display:</h2>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Alphabets')}
              onChange={() => handleOptionChange('Alphabets')}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Numbers')}
              onChange={() => handleOptionChange('Numbers')}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Highest lowercase alphabet')}
              onChange={() => handleOptionChange('Highest lowercase alphabet')}
            />
            Highest lowercase alphabet
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
