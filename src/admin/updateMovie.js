import React, {useEffect, useState, useContext} from 'react';
import "./admin.css"
import axios from "axios";
import firebase from "../firebase/firebase";
import {Link} from "react-router-dom";

const UpdateMovie = (props) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);


    const getMovie = async id => {
        await setLoading(true);
        await firebase.firestore().collection('movies')
            .doc(id).get().then(snapshort => {
                setTitle(snapshort.data().title);
                setCategory(snapshort.data().category);
            });
        await setLoading(false);
    }

    useEffect(() => {
        getMovie(props.match.params.id)
    }, [])


    const handleUpload = async files => {
        await setLoading(true);
        const myFile = files[0];
        const formData = new FormData();
        formData.append("file", myFile);
        formData.append("upload_preset", "yeonwt9g")
        await axios.post("https://api.cloudinary.com/v1_1/dghgrkkn8/image/upload", formData)
            .then(res => {
                setFile(res.data.url);
            }).catch(error => {
                console.log(error)
            })
        console.log(file)
        await setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = props.match.params.id;
        const movie = {
            title,
            category,
            file
        }
        firebase.firestore().collection('movies').doc(id).update({
            ...movie,
            updatedAt: new Date(),
        }).catch(error => {
            console.log(error)
        })
        props.history.push('/admin')
    }

    return (
        <div>
            <div className="ui container">
                {loading && loading ?
                    <p>Loading....</p> :
                    <>
                        <div className="ui breadcrumb" style={{marginTop: "40px"}}>
                            <Link to="/" className="section">Home</Link>
                            <div className="divider"> /</div>
                            <Link to="/admin" className="section">Movies</Link>
                            <div className="divider"> /</div>
                            <div className="active section">Update</div>
                        </div>
                        <form onSubmit={handleSubmit} className="ui form"
                              style={{marginTop: "40px", marginLeft: "60px"}}>
                            <div className="field">
                                <label>Movie Title</label>
                                <input
                                    type="text"
                                    onChange={e => setTitle(e.target.value)}
                                    defaultValue={title}
                                    name="title"
                                    id="title"
                                    disabled={loading}
                                    placeholder="Movie Title"/>
                            </div>
                            <div className="field">
                                <label>Movie Category</label>
                                <select required onChange={e => setCategory(e.target.value)}
                                        value={category}
                                        name="category"
                                        id="category"
                                        disabled={loading}>
                                    <option value="">Choose a Category</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="scifi">Sci-fi</option>
                                    <option value="Horror">Horror</option>
                                </select>
                            </div>

                            <div className="">
                                <label htmlFor="image" className="ui huge blue floated button">
                                    <i className="ui upload icon"/>
                                    Upload image

                                    <input
                                        type="file"
                                        onChange={e => handleUpload(e.target.files)}
                                        name="image"
                                        id="image"
                                        className="inputfile"
                                        disabled={loading}
                                        placeholder="Upload Movie"/>
                                </label>
                            </div>

                            <div className="" style={{marginTop: "20px"}}>
                                <button disabled={loading} className="ui black button" type="submit">Submit</button>
                            </div>
                        </form>
                    </>
                }

            </div>
        </div>
    );
}

export default UpdateMovie;