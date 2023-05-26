import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Watched = () => {
    const [movies, setMovies] = useState([]);

    //Get the data from LocalStorage
    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('watchedMovies'));
        if (movies) {
            setMovies(movies);
        }
    }, []);

    const clearWatched = () => {
        localStorage.removeItem('watchedMovies');
        setMovies([]);
    }

    return ( 
        <div className='movieList'>
            <h1>Watched</h1>
            <div className='movies'>
                {movies && movies.map(movie=>{
                    return <MovieCard key={movie.id} {...movie}/>
                })}
            </div>
            <div className='removeButton'>
                <button onClick={clearWatched}>Clear watched movies</button>
            </div>
        </div>
     );
}
 
export default Watched;