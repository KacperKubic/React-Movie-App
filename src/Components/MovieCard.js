import { Link } from 'react-router-dom';

const MovieCard = ({...movie}) => {
    const IMG_URL = "https://image.tmdb.org/t/p/w1280"

    //Setting different class for span depending on movie ratings
    const setVoteClass = (vote) => {
        if(vote >= 7){
            return "green";
        }else if (vote >= 5.4){
            return "orange"; 
        }else{
            return "red"
        }
    }

    return ( 
        <div className='movieCard'>
            <Link to={`/movies/${movie.id}`}>
                {/*If there is no movie poster, display the popcorn image*/}
                <img src={movie.poster_path ? (IMG_URL + movie.poster_path) : 'https://images.unsplash.com/photo-1620177088258-c84147ee601f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'} alt={movie.title}/>
                <div className='movieInfo'>
                    <h4>{movie.title}</h4>
                    <span className={`color ${setVoteClass(movie.vote_average)}`}>{movie.vote_average.toFixed(2)}</span>
                </div>
            </Link>
        </div>
     );
}

export default MovieCard;