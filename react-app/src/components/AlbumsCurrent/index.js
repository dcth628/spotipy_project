import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { currentUserAlbums, deleteAlbum } from '../../store/album'


const UserAlbums = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state=>state?.albums)

    useEffect(() => {
        dispatch(currentUserAlbums())
    }, [dispatch, deleteAlbum])



    return (
        <>
        {albums && (Object.values(albums).map(album =>
            <div key={album.id}>
                <div>album id: {album.id}</div>
                <div>album name; {album.album_name}</div>
                <div>year recorded: {album.year_recorded}</div>
                <div>album img: {album.album_img}</div>
                <div>user id: {album.user_id}</div>
                <div>likes: {album.likable_id.length}</div>
            </div>
        ))}
        </>
    )
}



export default UserAlbums
