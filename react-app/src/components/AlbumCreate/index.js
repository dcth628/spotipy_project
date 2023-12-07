import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAlbum } from "../../store/album";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './AlbumCreate.css'

const CreateAlbumFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [album_name, setAlbumName] = useState("");
    const [year_recorded, setYearRecorded] = useState(1999);
    const [album_img, setAlbumImg] = useState("");
    const { closeModal } = useModal();

    const updateAlbumName = (e) => setAlbumName(e.target.value);
    const updateYearRecorded = (e) => setYearRecorded(e.target.value);
    const updateAlbumImg = (e) => setAlbumImg(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newAlbum = {
            album_name,
            year_recorded,
            album_img,
        };

        let createdAlbum = await dispatch(createAlbum(newAlbum));
        if (createdAlbum) {
            history.push(`/albums/${createdAlbum.id}`);
            closeModal()
        }
    };

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <div>
                <h1>Add New Album</h1>
            </div>
            <div>
                <div>Album Name</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Album Name"
                    required
                    value={album_name}
                    onChange={updateAlbumName} />
            </div>
            <div>
                <div>Year Recorded</div>
                <input
                    className="input"
                    type="number"
                    placeholder="Year Recorded"
                    required
                    value={year_recorded}
                    onChange={updateYearRecorded} />
            </div>
            <div>
                <div>Album Image</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Album Image"
                    required
                    value={album_img}
                    onChange={updateAlbumImg} />
            </div>
            <div className="creates">
                <button className="create-button" type="submit">Create</button>
                <button className="create-button" onClick={closeModal}>No </button>
            </div>
        </form>
    )
}

export default CreateAlbumFormModal;
