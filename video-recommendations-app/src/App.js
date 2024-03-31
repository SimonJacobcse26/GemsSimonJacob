// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import VideoList from './components/VideoList';
import Loader from './components/Loader';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ypapi.formz.in/api/public/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = category === 'All' || video.category === category;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Tech">Tech</option>
        </select>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      {loading ? <Loader /> : <VideoList videos={filteredVideos} />}
    </div>
  );
};

export default App;
