import React from 'react';
import Nav from "../Nav";
import Banner from "../Banner";
import Row from "../Row";
import requests from "../requests";
import Comedy from "../Comedy";
import MovieContextProvider from "../Context/MovieContext";
import Scifi from "../SciFi";


function Home(props) {
    return (
        <div className="app">
            <Nav/>
            <Banner/>
            <MovieContextProvider>
                <Row isLargeRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals}/>
                <Row title="Trending now" fetchUrl={requests.fetchTrending}/>
                <Row title="Top Rated" fetchUrl={requests.fetchTrending}/>
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
                <Comedy/>
            </MovieContextProvider>
        </div>
    );
}

export default Home;