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

    return ( 
        <div className='movieList'>
            <h1>Watched</h1>
            <div className='movies'>
            {movies && movies.map(movie=>{
                return <MovieCard key={movie.id} {...movie}/>
            })}
            </div>
        </div>
     );
}
 
export default Watched;