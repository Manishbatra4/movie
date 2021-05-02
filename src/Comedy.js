import React,{useContext,useEffect} from 'react';
import {MovieContext} from "./Context/MovieContext";
import ScrollContainer from "react-indiana-drag-scroll";

const Comedy = () =>  {
    const {movie, getMovies} = useContext(MovieContext);
    const getMovie =async () => {
       await getMovies("comedy");
    }
    useEffect(() => {
        getMovie();
    },[])

    return (
        <div>
            <div className="row">
                <h2>Comedy Movies</h2>
                <ScrollContainer className="row__posters">
                    {movie.map((movie) => (
                        <img
                            key={movie.id}
                            className="row__poster row__posterLarge"
                            src={movie.file}
                            alt={movie.title}
                        />
                    ))}
                </ScrollContainer>
            </div>
        </div>
    );
}

export default Comedy;