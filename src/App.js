import React, { useEffect, useState } from 'react'
import './App.css';
import SearchIcon from './Search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://omdbapi.com?apiKey=c032e2d7';

// const movie = {
//     "Title": "Superman III",
//     "Year": "1983",
//     "imdbID": "tt0086393",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMzI3ZDllMTctNmI2Mi00OGQ4LTk2ZTQtYTJhMjA5ZGI2YmRkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
//     // "Poster": "N/A"
// }

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title} `)
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('action');
    }, [])

    return (
        <div className='App'>
            <h1>Movies_Ocean</h1>
            <div className='search'>
                <input type="text"
                    placeholder='Search Movies Here'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0
                ? (
                    <div className='container'>
                        <MovieCard movie={movies[0]} />
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>

                ) :
                <div className='empty'>
                    <h2>No Movies Found</h2>
                </div>
            }
        </div>
    )
}
export default App;
