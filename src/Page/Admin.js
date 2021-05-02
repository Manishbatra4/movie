import React from 'react';
import CreateMovie from "../admin/CreateMovie";
import MovieContextProvider from "../Context/MovieContext";
import Movies from "../admin/Movies";
import {Link} from "react-router-dom";

function Admin(props) {
    return (
        <div>

            <MovieContextProvider>
                <CreateMovie />
                <Movies />
            </MovieContextProvider>
        </div>
    );
}

export default Admin;