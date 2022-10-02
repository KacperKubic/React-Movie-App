import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const ToWatch = () => {
    const [movies, setMovies] = useState([]);

    //Get the data from LocalStorage
    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('moviesToWatch'));
        if (movies) {
            setMovies(movies);
        }
    }, []);

    return ( 
        <div className='movieList'>
            <h1>Movies to watch</h1>
            <div className='movies'>
            {movies && movies.map(movie=>{
                return <MovieCard key={movie.id} {...movie}/>
            })}
            </div>
        </div>
     );
}
 
export default ToWatch;