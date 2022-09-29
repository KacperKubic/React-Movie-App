import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import useFetch from "../useFetch";

const Homepage = () => {
    const API_KEY = "77e9dd12a2574e4691f61cfcc29054d7"
    const URL = "https://api.themoviedb.org/3/"
    const POPULAR_API = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const BEST_API = `${URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const UPCOMING_API = `${URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    const SEARCH_API = `${URL}search/movie?api_key=${API_KEY}&query=`

    const [popular, setPopular] = useState([]);
    const [best, setBest] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(POPULAR_API).then(res=>res.json()).then(data=>{
            setPopular(data.results)
        })

        fetch(BEST_API).then(res=>res.json()).then(data=>{
            setBest(data.results)
        })
        
        fetch(UPCOMING_API).then(res=>res.json()).then(data=>{
            setUpcoming(data.results)
        })
    }, [])
    


    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(search) {
            fetch(SEARCH_API + search).then((res)=> res.json()).then((data)=>{
                setMovies(data.results)
            });

            setSearch('')
        }
    }

    return ( 
        <div className='homepage'>
            <header>
                <form onSubmit={handleOnSubmit}>
                    <input type='search' placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </form>
            </header>

            <div className='results'>
                {movies && movies.map(movie=>{
                    return <MovieCard key={movie.id} {...movie}/>
                })}
            </div>
            
            <div className='category'>
                <h1>Popular</h1>
                <div className='movieRow'>
                    {popular.length > 0 && popular.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>
            
            <div className='category'>
                <h1>Best</h1>
                <div className='movieRow'>
                    {best.length > 0 && best.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>
                
            <div className='category'>  
                <h1>Upcoming</h1>
                <div className='movieRow'>
                    {upcoming.length > 0 && upcoming.map((movie)=>{
                        return <MovieCard key={movie.id} {...movie}/>
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default Homepage;