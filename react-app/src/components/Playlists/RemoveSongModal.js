import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { PlaylistDetailsFetch, RemoveSong } from "../../store/playlist";


const RemoveSongModal = ({songId, playlistId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const playlist = useSelector(state=>state.playlists[playlistId])


    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(RemoveSong(playlistId, songId));
        await dispatch(PlaylistDetailsFetch(playlistId));
        closeModal();
    }

    return (
        <>
            <div className="delete-confirmation-form">
                <h1 className="delete-title">Confirm Delete</h1>
                <div className="delete-confirm">Are you sure you want to remove this song?</div>
                <div className="delete-buttons">
                    <button className="delete-button" onClick={handleClick}>Yes</button>
                    <button className="delete-button" onClick={closeModal}>No</button>
                </div>
            </div>
        </>
    )
}

export default RemoveSongModal
