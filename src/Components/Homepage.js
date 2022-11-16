import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import useFetch from "../useFetch";

const Homepage = () => {
    //Variables with all the API URLs
    const API_KEY = "77e9dd12a2574e4691f61cfcc29054d7"
    const URL = "https://api.themoviedb.org/3/"
    const POPULAR_API = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const BEST_API = `${URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const UPCOMING_API = `${URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    const SEARCH_API = `${URL}search/movie?api_key=${API_KEY}&query=`

    //States
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    //Variables that take the data from my custom hook "useFetch"
    const { error: popularErr, loading: popularLoad, data: popular} = useFetch(POPULAR_API);
    const { error: bestErr, loading: bestLoad, data: best} = useFetch(BEST_API);
    const { error: upcomingErr, loading: upcomingLoad, data: upcoming} = useFetch(UPCOMING_API);
    
    //Fetching the data from the API 5 seconds after search state change
    useEffect(()=>{
        console.log(search)
        const searchMovies = async () => {
            await fetch(SEARCH_API + search).then((res) => res.json()).then((data)=>{
                setMovies(data.results)
            })
        }

        const timeoutId = setTimeout(() => {
            if(search){
                searchMovies()
            }else(
                setMovies([])
            )
        },  500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [SEARCH_API, search])

    return ( 
        <div className='homepage'>
            <header>
                    <input type='search' placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </header>
            
            <div className='results'>
                {movies && movies.map(movie=>{
                    return <MovieCard key={movie.id} {...movie}/>
                })}
            </div>
            
            {/*If the page is still loading display Loading massage and if there is an error display error*/}
            {(popularErr || bestErr || upcomingErr) && <div>{popularErr || bestErr || upcomingErr}</div>}
            {(popularLoad || bestLoad || upcomingLoad) && <div>Loading...</div>}
            
            {popular && 
            <div className='category'>
                <h1>Popular</h1>
                <div className='movieRow'>
                    {popular.results.length > 0 && popular.results.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>}

            {best && 
            <div className='category'>
                <h1>Best</h1>
                <div className='movieRow'>
                    {best.results.length > 0 && best.results.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>}

            {upcoming && 
            <div className='category'>
                <h1>Upcoming</h1>
                <div className='movieRow'>
                    {upcoming.results.length > 0 && upcoming.results.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>}

        </div>
     );
}
 
export default Homepage;