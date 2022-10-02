import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import MovieCard from "./MovieCard";

const MovieDetails = () => {
    
    //API related variables
    var {id} = useParams()
    const IMG_URL = "https://image.tmdb.org/t/p/w1280"
    const DETAILS_API = `https://api.themoviedb.org/3/movie/${id}?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US`
    const SIMILAR_API = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=77e9dd12a2574e4691f61cfcc29054d7&language=en-US&page=1`

    //States
    const [watched, setWatched] = useState({});
    const [toWatch, setToWatch] = useState({});
    const [favourite, setFavourite] = useState({});

    //Variables that take data from useFetch hook
    const { error: detailsErr, loading: detailsLoad, data: details, refetch } = useFetch(DETAILS_API);
    const { error: similarErr, loading: similarLoad, data: similar } = useFetch(SIMILAR_API);

    //When the state changes run useEffect hook and add the data to local storage
    useEffect(() => {
        if(Object.keys(watched).length !== 0){
            if(localStorage.getItem('watchedMovies') === null){
                var watchedMovies = []
            }else{
                watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'))
            }
            watchedMovies.push(watched);
            localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
            setWatched({}) 
        }else if(Object.keys(toWatch).length !== 0){
            if(localStorage.getItem('moviesToWatch') === null){
                var moviesToWatch = []
            }else{
                moviesToWatch = JSON.parse(localStorage.getItem('moviesToWatch'))
            }
            moviesToWatch.push(toWatch);
            localStorage.setItem('moviesToWatch', JSON.stringify(moviesToWatch));
            setToWatch({})
        }else if(Object.keys(favourite).length !== 0){
            if(localStorage.getItem('favouriteMovies') === null){
                var favouriteMovies = []
            }else{
                favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies'))
            }
            favouriteMovies.push(favourite);
            localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
            setFavourite({})
        }
    }, [watched, toWatch, favourite])

    //Functions that update the state on click of one of three buttons
    const addWatched = () =>{
        setWatched({id: details.id, title: details.title, vote_average: details.vote_average, poster_path: details.poster_path})
    }

    const addToWatch = () =>{
        setToWatch({id: details.id, title: details.title, vote_average: details.vote_average, poster_path: details.poster_path})
    }

    const addFavourite = () =>{
        setFavourite({id: details.id, title: details.title, vote_average: details.vote_average, poster_path: details.poster_path})
    }

    return ( 
        <div className='movieDetails'>
            {/*If the data is loading or there is an error display a message*/}
            {(detailsErr || similarErr) && <div>{detailsErr || similarErr}</div>}
            {(detailsLoad || similarLoad) && <div>Loading...</div>}
            {details &&
            <div className='details'>
                <div className='detailsImg'>
                    <img src={IMG_URL + details.poster_path} alt={details.title}/>
                </div>
                <div className='detailsInfo'>
                    <h1>{details.title}</h1>
                    <hr/>
                    <h4>{details.overview}</h4>
                    <p>Release date: <span>{details.release_date}</span></p>
                    <p>Rating: <span>{details.vote_average}</span></p>
                    <p>Number of votes: <span>{details.vote_count.toFixed(2)}</span></p>
                    <p>Genres: <span>{details.genres.map((genre)=>{
                        return genre.name + ' ' 
                    })}</span></p>
                    <button onClick={addWatched}>Watched</button>
                    <button onClick={addToWatch}>To watch</button>
                    <button onClick={addFavourite}>Favourite</button>
                </div>
            </div>
            }
            {/*Display similar movies*/}
            {similar &&
            <div className='category'>
                <h2>Similar movies:</h2>
                <div className='movieRow'>
                    {similar.results.map((movie)=>{
                        id = movie.id; return <MovieCard key={movie.id} {...movie} onClick={refetch}/>
                    })}
                </div>
            </div>}
        </div>
     );
}
 
export default MovieDetails;