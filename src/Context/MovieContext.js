import React, {useState, createContext, useEffect} from 'react';
import firebase from "../firebase/firebase";

export const MovieContext = createContext();

function MovieContextProvider(props) {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([]);

    const addMovie = movie => {
        firebase.firestore().collection("movies").add({
            ...movie,
            createdAt: new Date()
        })
    }

    const deleteMovie = id => {
        firebase.firestore().collection('movies').doc(id).delete()
            .catch(error => {
                console.log(error)
            })
    }

    const updateMovies = (id, movie) => {
        console.log(movie)
        firebase.firestore().collection('movies').doc(id).update({
            ...movie,
            updatedAt: new Date(),
        }).catch(error => {
            console.log(error)
        })
    }

    const getMovies = async category => {
        firebase.firestore().collection('movies')
            .where("category","==", category)
            .onSnapshot(snapshot => {
                setMovie(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                )));
            });
    }

    useEffect(() => {
        firebase.firestore().collection('movies')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setMovies(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                )));
            });
    }, []);

    return (
        <MovieContext.Provider value={{addMovie, movies, deleteMovie, updateMovies, getMovies, movie}}>
            {props.children}
        </MovieContext.Provider>
    );
}

export default MovieContextProvider;