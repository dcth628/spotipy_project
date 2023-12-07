import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAlbum, getAlbumDetail } from "../../store/album";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import './AlbumEdit.css'

const EditAlbumFormModal = ({ album }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [album_name, setAlbumName] = useState(album.album_name);
    const [year_recorded, setYearRecorded] = useState(album.year_recorded);
    const [album_img, setAlbumImg] = useState(album.album_img);
    const { closeModal } = useModal();

    const updateAlbumName = (e) => setAlbumName(e.target.value);
    const updateYearRecorded = (e) => setYearRecorded(e.target.value);
    const updateAlbumImg = (e) => setAlbumImg(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newAlbum = {
            id: album.id,
            album_name,
            year_recorded,
            album_img,
        };

        let updatedAlbum = await dispatch(editAlbum(newAlbum));
        if (updatedAlbum) {
            closeModal();
            dispatch(getAlbumDetail(album.id))
            // history.push(`/albums/${updatedAlbum.id}`);
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div>
                <h1>Edit Album</h1>
            </div>
            <div>
                <div>Album Name</div>
                <input
                    type="text"
                    placeholder="Album Name"
                    required
                    value={album_name}
                    onChange={updateAlbumName} />
            </div>
            <div>
                <div>Year Recorded</div>
                <input
                    type="number"
                    placeholder="Year Recorded"
                    required
                    value={year_recorded}
                    onChange={updateYearRecorded} />
            </div>
            <div>
                <div>Album Image</div>
                <input
                    type="text"
                    placeholder="Album Image"
                    required
                    value={album_img}
                    onChange={updateAlbumImg} />
            </div>
            <div className="edit-buttons">
                <button className="edit-button" type="submit">Update Album</button>
                <button className="edit-button" onClick={closeModal}>No </button>
            </div>
        </form>
    )
}

export default EditAlbumFormModal;
