import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
    const [numLines, setNumLines] = useState('');
    const [excludeAa, setExcludeAa] = useState('');
    const [numModels, setNumModels] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/', {
            num_lines: numLines,
            exclude_aa: excludeAa,
            num_models: numModels
        }, { responseType: 'blob' })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'protein_data.zip');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            <h1>ProteinPulse</h1>
            <h4>Random Protein Generator</h4>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Number of Lines:</label>
                    <input type="number" value={numLines} onChange={(e) => setNumLines(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Exclude Amino Acids:</label>
                    <input type="text" value={excludeAa} onChange={(e) => setExcludeAa(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Number of Models:</label>
                    <input type="number" value={numModels} onChange={(e) => setNumModels(e.target.value)} required />
                </div>
                <button type="submit">Generate Protein Data</button>
            </form>
            <footer className="footer">
                <div className="social-links">
                    <a href="https://github.com/im-sparrow05" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://twitter.com/your-twittehttps://x.com/rahulku02411763?t=1Y34c24GV4Ad6iEbhIIUFA&s=08" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.linkedin.com/in/rahul-kumar-436179239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                <div className="copyright">
                    &copy; 2024 Rahul Kumar. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default App;
