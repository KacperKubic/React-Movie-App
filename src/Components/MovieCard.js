import { Link } from 'react-router-dom';

const MovieCard = ({...movie}) => {

    const IMG_URL = "https://image.tmdb.org/t/p/w1280"
    return ( 
        <div className='MovieCard'>
            <Link to={`/movies/${movie.id}`}>
                <h1>{movie.title}</h1>
                <img src={IMG_URL + movie.poster_path} alt={movie.title}/>
            </Link>
        </div>
     );
}
 
export default MovieCard;