import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { CreatePlaylist, PlaylistDetailsFetch } from "../../store/playlist";



const PlaylistFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [playlist_name, setPlaylistName] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

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

        const newPlaylist = {
            playlist_name
        }

        const playlist = await dispatch(CreatePlaylist(newPlaylist)).catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Playlist name is required";
                setErrors(errorMsg);
            }
        });

        if (playlist) {
            history.push(`/playlists/${playlist.id}`)
            closeModal()
        }
    };

    return (
        <form className='create-form' onSubmit={handleSubmit}>
            <div>
                <h1>Create a new playlist</h1>
            </div>
            <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
            <div>
                <div>Playlist Name</div>
                <input
                    type="text"
                    value={playlist_name}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="input"
                    placeholder="Playlist Name"
                />
            </div>
            <div className="creates">
                <button className="create-button" type="submit">Create</button>
                <button className="create-button" onClick={closeModal}>No</button>
            </div>
        </form>
    )
}


export default PlaylistFormModal;
