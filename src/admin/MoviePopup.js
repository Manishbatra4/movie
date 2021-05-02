import React, {useState} from 'react';
import Modal from "react-modal";
import UpdateMovie from "./updateMovie";

function MoviePopup({id, movie}) {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={openModal} className="ui primary button">Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)'
                    }
                }}>
                <p className="w-full flex justify-end text-2xl text-black cursor-pointer"
                   onClick={closeModal}>&times;</p>
                <UpdateMovie movie={movie} id={id} close={() => setIsOpen(false)}/>
            </Modal>
        </>
    );
}

export default MoviePopup;