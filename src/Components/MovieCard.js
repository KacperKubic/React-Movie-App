import { Link } from 'react-router-dom';

const MovieCard = ({...movie}) => {

    const IMG_URL = "https://image.tmdb.org/t/p/w1280"
    return ( 
        <div className='movieCard'>
            <Link to={`/movies/${movie.id}`}>
                    <img src={IMG_URL + movie.poster_path} alt={movie.title}/>
                    <h2>{movie.title}</h2>
            </Link>
        </div>
     );
}
 
export default MovieCard;