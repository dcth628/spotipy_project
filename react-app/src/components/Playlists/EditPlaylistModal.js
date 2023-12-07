import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { EditPlaylist, PlaylistDetailsFetch } from "../../store/playlist";

const EditPlaylistModal = ({playlistId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const playlist = useSelector(state=>state.playlists[playlistId]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    const [playlist_name, setPlaylistName] = useState(playlist.playlist_name);

    useEffect(() => {
        if (playlist_name.length < 1) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }, [playlist_name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const editPlaylist = {
            playlist_name
        }

        const updatedPlaylist = await dispatch(EditPlaylist(editPlaylist, playlistId)).catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Playlist name is required";
                setErrors(errorMsg);
            }
        });

        if (updatedPlaylist) {
            await dispatch(PlaylistDetailsFetch(playlistId))
            closeModal()
        }
    };

    return (
        <form className='edit-form' onSubmit={handleSubmit}>
            <div>
                <h1>Edit Playlist</h1>
            </div>
            <div>
                <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
            </div>
            <div>
                <input
                    type="text"
                    value={playlist_name}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="input"
                    placeholder="Playlist Name"
                />
            </div>
            <div className="edit-buttons">
                <button className="edit-button" type="submit" disabled={isButtonDisabled}>Update Album</button>
                <button className="edit-button" onClick={closeModal}>No </button>
            </div>
        </form>
    )
}


export default EditPlaylistModal
