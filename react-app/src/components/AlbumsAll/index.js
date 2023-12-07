import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { currentUserAlbums } from '../../store/album'


const UserAlbums = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state=>state.albums)

    useEffect(() => {
        dispatch(currentUserAlbums())
    }, [dispatch])

    return (
        <>
        {Object.values(albums).map(album =>
            <div>
                <div>{album.id}</div>
                <div>{album.album_name}</div>
            </div>
        )}
        </>
    )
}



export default UserAlbums
