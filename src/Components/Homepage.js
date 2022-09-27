import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Homepage = () => {
    const popular_api = "https://api.themoviedb.org/3/movie/popular?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US&page=1"

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        fetch(popular_api).then((res) => res.json()).then((data) => {
            console.log(data);
            setMovies(data.results);
        })
    }, [])

    return ( 
        <div>
            {movies.map((movie)=>{
                return <MovieCard />
            })}
        </div>
     );
}
 
export default Homepage;