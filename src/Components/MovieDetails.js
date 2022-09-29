import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import MovieCard from "./MovieCard";

const MovieDetails = () => {

    const {id} = useParams()
    const IMG_URL = "https://image.tmdb.org/t/p/w1280"
    const DETAILS_API = `https://api.themoviedb.org/3/movie/${id}?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US`
    const SIMILAR_API = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US&page=1`

    const { error: detailsErr, loading: detailsLoad, data: details } = useFetch(DETAILS_API);
    const { error: similarErr, loading: similarLoad, data: similar } = useFetch(SIMILAR_API)

    return ( 
        <div className='MovieDetails'>
            {(detailsErr || similarErr) && <div>{detailsErr || similarErr}</div>}
            {(detailsLoad || similarLoad) && <div>Loading...</div>}
            {details &&
            <div className='details'>
                <div className='detailsImg'>
                    <img src={IMG_URL + details.poster_path} alt={details.title}/>
                </div>
                <div className='detailsInfo'>
                    <h1>{details.title}</h1>
                    <h4>{details.overview}</h4>
                    <p>Release date: {details.release_date}</p>
                    <p>Rating: {details.vote_avarage}</p>
                    <p>Number of votes: {details.vote_count}</p>
                    <p>Genres: {details.genres.map((genre)=>{
                        return <text>{genre.name} </text>
                    })}</p>
                </div>
            </div>
            }
            {similar &&
            <div className='category'>
                <h2>Similar movies:</h2>
                <div className='movieRow'>
                    {similar.results.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
                {console.log(similar.results)}
            </div>}
        </div>
     );
}
 
export default MovieDetails;