import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { DeletePlaylist, currentUserPlaylists } from "../../store/playlist";
import { useHistory } from "react-router-dom";



const DeletePlaylistModal = ({playlistId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(DeletePlaylist(playlistId));
        // await dispatch(currentUserPlaylists());
        history.push('/collection');
        closeModal();
    }

    return (
        <>
            <div className="delete-form">
                <h1 className="delete-title">Confirm Delete</h1>
                <div className="delete-confirm">Are you sure you want to delete this playlist?</div>
                <div className="delete-buttons">
                <button className="delete-button" onClick={handleClick}>Yes (Delete)</button>
                <button className="delete-button" onClick={closeModal}>No </button>
                </div>
            </div>
        </>
    )
}


export default DeletePlaylistModal
