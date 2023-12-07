import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { addNewSongFetch } from "../../store/song";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAlbumDetail } from "../../store/album";
import './SongAddModal.css'



export default function SongAddModal({ albumId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { albumId } = useParams()
    const [song_name, setSongName] = useState('')
    const [song_src, setSongSrc] = useState('')
    const [song_length, setSongLength] = useState('')
    // const [album_id, setAlbumId] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();



    const handleSubmit = async (e) => {
        e.preventDefault();
        // ADD VALIDATIONS HERE USING STATE AND AN ERRORS ARRAY
        const validationErrors = []
        if (!song_name) validationErrors.push(['Song name is required.'])
        if (!song_src) validationErrors.push(['Song source is required.'])
        if (!song_length) validationErrors.push(['Song length in seconds is required.'])
        // if (!album_id) validationErrors.push(['Album ID is temporarily required.'])
        if (validationErrors.length) return setErrors(validationErrors)

        setErrors([])

        const newSongData = {
            song_name,
            song_src,
            song_length,
            album_id: albumId
        }
        await dispatch(addNewSongFetch(newSongData))
              dispatch(getAlbumDetail(albumId))
              closeModal()
    }


    return (
            <form className="new-song-modal-form" onSubmit={handleSubmit} >
                <div>
                    <h1 className="new-song-modal-header">Add New Song</h1>
                </div>
                <div>
                    <div>Song Name</div>
                    <input
                        className="input-box"
                        type="text"
                        value={song_name}
                        onChange={(e) => setSongName(e.target.value)}
                        placeholder='Song Name'
                    />
                </div>
                <div>
                    <div>Song Source</div>
                    <input
                        className="input-box"
                        type="text"
                        value={song_src}
                        onChange={(e) => setSongSrc(e.target.value)}
                        placeholder='Song Source'
                    />
                </div>
                <div>
                    <div>Song Length</div>
                    <input
                        className="input-box"
                        type="integer"
                        value={song_length}
                        onChange={(e) => setSongLength(e.target.value)}
                        placeholder='Song Length in Seconds'
                    />
                </div>
                {/* <input
                    type="integer"
                    value={album_id}
                    onChange={(e) => setAlbumId(e.target.value)}
                    placeholder='Album ID'
                /> */}
                <div className="add-buttons">
                    <button className="add-button" type="submit" >Add Song</button>
                    <button className="add-button" onClick={closeModal}>No </button>
                </div>
            </form>
    )
}
