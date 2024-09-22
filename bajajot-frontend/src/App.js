import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://bajajot-backend.onrender.com/bfhl', JSON.parse(jsonData));
            setResponse(res.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        setFilter((prev) => checked ? [...prev, value] : prev.filter(f => f !== value));
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Dev Challenge</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={jsonData} onChange={(e) => setJsonData(e.target.value)} placeholder='Enter JSON data' />
                <button type="submit">Submit</button>
            </form>

            {response && (
                <div>
                    <h2>Response Filter:</h2>
                    <label>
                        <input type="checkbox" value="numbers" onChange={handleFilterChange} /> Numbers
                    </label>
                    <label>
                        <input type="checkbox" value="alphabets" onChange={handleFilterChange} /> Alphabets
                    </label>
                    <label>
                        <input type="checkbox" value="highest_lowercase_alphabet" onChange={handleFilterChange} /> Highest Lowercase Alphabet
                    </label>

                    <div>
                        {filter.includes("numbers") && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {filter.includes("alphabets") && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {filter.includes("highest_lowercase_alphabet") && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
