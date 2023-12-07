import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { currentUserPlaylists } from '../../store/playlist'


const UserPlaylists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state=>state?.playlists)

    useEffect(() => {
        dispatch(currentUserPlaylists())
    }, [dispatch])

    return (
        <>
            {Object.values(playlists).map((playlist, idx) => {

                if (playlist) {
                    return <div key={idx}>
                        <div>Playlist Id: {playlist?.id}</div>
                        <div>Playlist Owner Id: {playlist?.owner_id}</div>
                        <div>Playlist Name: {playlist?.playlist_name}</div>
                    </div>
                }
            })}
        </>
    )
}

export default UserPlaylists
