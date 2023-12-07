import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

import OpenModalButton from "../OpenModalButton";
import SongAddModal from "./SongAddModal";
import SongDeleteModal from "./SongDeleteModal";
import { allSongsFetch } from "../../store/song";

export default function SongsDisplay() {
    const dispatch = useDispatch();
    const songs = useSelector(state=>state.songs)

    useEffect(() => {
        dispatch(allSongsFetch())
    }, [dispatch])

    const songLengthFunc = (data) => {
        const sec = data % 60
        const min = (data - sec) / 60
        if (sec === 0){
            return `${min}:00`
        }
        if (sec < 10){
            return `${min}:0${sec}`
        }
        return `${min}:${sec}`
    }

    return (
        <>
            <h1>SONGS!</h1>
            <div>
                <OpenModalButton
                    buttonText="New Song"
                    modalComponent={<SongAddModal />}
                />
            </div>
            <div className="songs-display">
                {Object.values(songs).map(song => (
                    <div key={song.id}>
                        <div>
                            <p>{song.song_name}</p>
                            <p>{songLengthFunc(song.song_length)}</p>
                        </div>
                        <div className="delete-song-button">
                            <OpenModalButton
                                buttonText="Delete Song"
                                modalComponent={<SongDeleteModal songId={song.id} />}
                                />
                        </div>
                        <br></br>
                    </div>
                ))}
            </div>
        </>
    )
}
