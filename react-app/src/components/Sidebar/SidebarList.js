import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { currentUserAlbums } from "../../store/album";
import { currentUserPlaylists } from "../../store/playlist";
import './Sidebar.css'

const SidebarList = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state=> state?.albums)
    const playlists = useSelector(state=> state?.playlists)

    const {user} = useSelector(state=>state?.session)

    let userAlbums =[]
    if (user) {
        userAlbums = Object.values(albums).filter((album) => album?.user_id == user?.id)
    }

    let userPlaylists = []
    if (user) {
        userPlaylists = Object.values(playlists).filter((playlists) => playlists?.owner_id == user?.id)
    }

    useEffect(() => {
        dispatch(currentUserAlbums())
        dispatch(currentUserPlaylists())
    }, [dispatch]);

    return (
        <div>
            <h3 className="album-list-header">Albums</h3>
            {userAlbums && (userAlbums ? userAlbums?.map((album) => (
                <table className="album-list" key={`sidebar-album-${album?.id}`}>
                <NavLink className="album-container" to={`/albums/${album?.id}`}>
                <td>
                    <img className="album-image" src={album?.album_img} alt="" />
                </td>
                <td className="list-name">
                    {album?.album_name}
                </td>
                </NavLink>
                </table>
            )) : <></>)}
            <h3 className="album-list-header">Playlists</h3>
            {userPlaylists && (userPlaylists ? userPlaylists.map((playlist) => (
                <div key={`sidebar-playlist-${playlist?.id}`}>
                <NavLink to={`/playlists/${playlist?.id}`}>
                <div className="list-name">
                    {playlist?.playlist_name} : {playlist?.songs.length} songs
                </div>
                </NavLink>
                </div>
            )) : <></>)}
        </div>
    )
}


export default SidebarList
