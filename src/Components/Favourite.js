import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Favourite = () => {
    const [movies, setMovies] = useState([]);

    //Get the data from LocalStorage
    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('favouriteMovies'));
        if (movies) {
            setMovies(movies);
        }
    }, []);

    return ( 
        <div className='movieList'>
            <h1>Favourite</h1>
            <div className='movies'>
            {movies && movies.map(movie=>{
                return <MovieCard key={movie.id} {...movie}/>
            })}
            </div>
        </div>
     );
}
 
export default Favourite;