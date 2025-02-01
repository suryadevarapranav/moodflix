import React, {useState, useEffect} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCards.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [movieList, setMovieList] = useState([]);

    const [isLoading, setIsLoading] = useState(false); //set to true to simluate loading


    const fetchMovies = async () => {

        setIsLoading(true);
        setErrorMessage('');

        try {
            const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endPoint, API_OPTIONS);

            // throw new Error('Error fetching movies'); // simulating the error
            if (!response.ok) {
                throw new Error('Error fetching movies');
            }

            const data = await response.json();
            // console.log(data);

            if(data.error === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies..');
                setMovieList([]);
                return;
            }

            // if it succeeds
            setMovieList(data.results || []);

        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
            setErrorMessage('Error Fetching movies. Please try again later....');
        } finally {
            setIsLoading(false);   //set to true to simluate loading
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []) // only load at the start

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle..</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}

                    {/*{errorMessage && <p className="text-red-500">{errorMessage}</p>}*/}
                </section>

            </div>


        </main>
    )
}
export default App
