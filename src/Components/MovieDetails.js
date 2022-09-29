import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieDetails = () => {

    const[movieDetails, setMovieDetails] = useState({});
    const[similar, setSimilar] = useState([]);
    const {id} = useParams()
    const IMG_URL = "https://image.tmdb.org/t/p/w1280"
    const DETAILS_API = `https://api.themoviedb.org/3/movie/${id}?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US`
    const SIMILAR_API = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US&page=1`

    useEffect(() => {
        fetch(DETAILS_API).then((res)=>res.json()).then((data) =>{
            console.log(data);
            setMovieDetails(data);
        })

        fetch(SIMILAR_API).then((res)=>res.json()).then((data) =>{
            console.log(data);
            setSimilar(data.results);
        })
    }, [])

    console.log(movieDetails)

    return ( 
        <div className='MovieDetails'>
            <div>
                <img src={IMG_URL + movieDetails.poster_path} alt={movieDetails.title}/>
            </div>
            <div>
                <h1>{movieDetails.title}</h1>
                <h4>{movieDetails.overview}</h4>
                <p>Release date: {movieDetails.release_date}</p>
                <p>Rating: {movieDetails.vote_avarage}</p>
                <p>Number of votes: {movieDetails.vote_count}</p>
                {/*<p>Genres: {movieDetails.genres.map((genre)=>{
                    return <p>{genre.name}</p>
                })}</p>*/}
            </div>
            <div className='category'>
                <h2>Similar movies:</h2>
                <div className='movieRow'>
                    {similar.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>

        </div>
     );
}
 
export default MovieDetails;