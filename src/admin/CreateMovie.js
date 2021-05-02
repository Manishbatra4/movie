import React, {useState, useContext} from 'react';
import "./admin.css";
import {MovieContext} from "../Context/MovieContext";
import firebase from "../firebase/firebase";
import axios from "axios";
import {Link} from "react-router-dom";

function CreateMovie(props) {

    const {addMovie} = useContext(MovieContext);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);


    const handleUpload = async files => {
        setLoading(true)
        const myFile = files[0];
        const formData = new FormData();
        formData.append("file", myFile);
        formData.append("upload_preset", "yeonwt9g")
        axios.post("https://api.cloudinary.com/v1_1/dghgrkkn8/image/upload", formData)
            .then(res => {

                console.log(res.data.url);
                setFile(res.data.url);
            }).catch(error => {
            console.log(error)
        })
        console.log(file)
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movie = {
            title,
            category,
            file
        }
        if (!loading) {
            await addMovie(movie)
        } else {
            await console.log(movie)
        }
        setTitle('');
        setCategory('');
        setFile('');
    }


    return (
        <div className="ui container">
            <div className="ui breadcrumb" style={{marginTop: "40px"}}>
                <Link to="/" className="section">Home</Link>
                <div className="divider"> /</div>
                <Link to="/admin" className="section">Movies</Link>
            </div>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit} className="ui form grid" style={{marginTop: "20px", marginLeft: "60px"}}>
                <div
                    className={loading && loading ? "field ui disabled four wide column" : "field loading four wide column"}>
                    <label>Movie Title</label>
                    <input
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        name="title"
                        id="title"
                        disabled={loading}
                        placeholder="Movie Title"/>
                </div>
                <div className="field four wide column">
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

                <div className="four wide column">
                    <label htmlFor="image" className="ui huge blue button">
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

                <div className="four wide column" style={{marginTop: "20px"}}>
                    <button disabled={loading} className="ui green button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CreateMovie;