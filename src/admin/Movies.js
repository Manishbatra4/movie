import React, {useContext} from 'react';
import {MovieContext} from "../Context/MovieContext";
import MoviePopup from "./MoviePopup";
import {Link} from "react-router-dom";

function Movies(props) {
    const {movies, deleteMovie} = useContext(MovieContext);

    return (
        <div className="ui container">
            <table className="ui celled table">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                { movies.map(movie => (
                    <tr key={movie.id}>
                        <>
                        <td className="ui small image"><img src={movie.file} alt=""/></td>
                        <td>{movie.title}</td>
                        <td>{movie.category}</td>
                        <td>
                            <button className="ui red button" onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) deleteMovie(movie.id)}}>
                                Delete
                            </button>
                        </td>
                            <td><Link className="ui primary button" to={"/update/"+movie.id}>Edit</Link></td>
                        </>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}

export default Movies;