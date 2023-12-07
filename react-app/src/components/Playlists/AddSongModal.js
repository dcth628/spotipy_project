import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { currentUserPlaylists, AddSongFetch } from "../../store/playlist";

import './AddSongModal.css'

const AddSongModal = ({songId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [selectedPlaylist, setSelectedPlaylist] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const playlists = useSelector(state=>state?.playlists);
    const sessionUser = useSelector(state=>state.session?.user);


    useEffect(() => {
        dispatch(currentUserPlaylists())
    }, [dispatch])


    const handleSelectChange = async (e) => {
        e.preventDefault();

        setSelectedPlaylist(e.target.value)
        const playlistId = e.target.value
        await dispatch(AddSongFetch(playlistId, songId))
        setFormSubmitted(true);
        setTimeout(() => {
            closeModal()
        }, 1200);
    }

    let userPlaylists = []
    if (sessionUser) {
        userPlaylists = Object.values(playlists).filter((playlists) => playlists.owner_id === sessionUser.id)
    }


    return (
        <>
            {!selectedPlaylist &&(
                <div className="modal-form">
                    {playlists ? (
                            <div>
                                <div>
                                    <label htmlFor="mySelect" className="select">Select a playlist</label>
                                </div>
                                <div>
                                    <select id='mySelect' value={selectedPlaylist} onChange={handleSelectChange}>
                                        <option value={(e) => e.target.value}>-- Select --</option>
                                        {userPlaylists.map(playlist => {
                                            const songs = playlist?.songs.map(song => song.songs);
                                            const songIds = songs.map(song => song.id);
                                            const isSongAdded = songIds.includes(songId);

                                            if (!isSongAdded) {
                                                return (
                                                    <option key={playlist.id} value={playlist.id}>
                                                        {playlist.playlist_name}
                                                    </option>
                                                );
                                            }
                                            return null;
                                        })}
                                    </select>
                                </div>
                            </div>
                        ) : 'You have no playlists to add to'}
                    </div>
                )}
                {formSubmitted && (
                    <div className="modal-form">
                    <h3 className="header">This Song has been added to your playlist.</h3>
                    </div>
                )}
        </>
    )
}

export default AddSongModal
