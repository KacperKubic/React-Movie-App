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

    //State used for displaying propper buttons for adding/deleting from local storage
    const [inWatched, setInWatched] = useState(false);
    const [inToWatch, setInToWatch] = useState(false);
    const [inFavourite, setInFavoutires] = useState(false);

    //Variables that take data from useFetch hook
    const { error: detailsErr, loading: detailsLoad, data: details, refetch } = useFetch(DETAILS_API);
    const { error: similarErr, loading: similarLoad, data: similar } = useFetch(SIMILAR_API);

    //When the state changes run useEffect hook
    useEffect(() => {
        //Function responsible for checking if the movie is already in one of three lists in local storage
        const checkLocalStorage = async () => {
            const movieInfo = await details;
            if (localStorage.getItem('watchedMovies') && movieInfo && localStorage.getItem('watchedMovies').includes(movieInfo.id)){
                setInWatched(true)
            }else(
                setInWatched(false)
            )

            if (localStorage.getItem('moviesToWatch') && movieInfo &&  localStorage.getItem('moviesToWatch').includes(movieInfo.id)){
                setInToWatch(true)
            }else if(localStorage.getItem('watchedMovies').includes(movieInfo.id)){
                setInToWatch(true)
            }else(
                setInToWatch(false)
            )

            if (localStorage.getItem('favouriteMovies') && movieInfo && localStorage.getItem('favouriteMovies').includes(movieInfo.id)){
                setInFavoutires(true);
            }else(
                setInFavoutires(false)
            )
        }

        //Adding the data to local storage. If a key doesn't exist create it.
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

        checkLocalStorage();
    }, [watched, toWatch, favourite, details])

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

    //Function for deleting from local storage

    return ( 
        <div className='movieDetails'>
            {/*If the data is loading or there is an error display a message*/}
            {(detailsErr || similarErr) && <div>{detailsErr || similarErr}</div>}
            {(detailsLoad || similarLoad) && <div>Loading...</div>}
            {/*Displaying movie details such us title, description or rating*/}
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
                    <div className='buttons'>
                        {!inWatched && <button onClick={addWatched}>Add to watched</button>}
                        {inWatched && <button className='watched' disabled>Already watched</button>}
                        {!inToWatch && <button onClick={addToWatch}>Add to watch list</button>}
                        {inToWatch && <button style={{display: "none"}}/>}
                        {!inFavourite && <button onClick={addFavourite}>Add to favourites</button>}
                        {inFavourite && <button className='favourite' disabled>Favourite</button>}


                    </div>
                </div>
            </div>
            }
            {/*Display similar movies*/}
            {similar &&
            <div className='category'>
                <h1>Similar movies:</h1>
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