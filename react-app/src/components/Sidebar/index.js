import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";
import CreateAlbumFormModal from "../AlbumCreate";
import './Sidebar.css'
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { search } from "../../store/search";
import { allSongsFetch } from "../../store/song";
import { getAlbumDetail, getAllAlbums } from "../../store/album";
import SidebarList from "./SidebarList";

import './index.css';

const SideNav = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState("")
    const { albumId } = useParams()

    const results = useSelector((state) => state.search)
    const albums = results.albums
    const songs = results.songs
    const playlists = results.playlists

    useEffect(() => {
        if (input.length > 0) {
            dispatch(search(input));
        }
    }, [dispatch, input])

    const show = () => {
        document.querySelector(".search-results").classList.remove('hidden');
    };

    const hide = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelector(".search-results").classList.add('hidden');
        };
    };

    const reset1 = (id) => {
        document.querySelector(".search-results").classList.add("hidden");
        history.push(`/albums/${id}`);
        setInput("")
    }
    const reset2 = (id) => {
        document.querySelector(".search-results").classList.add("hidden");
        history.push(`/playlists/${id}`);
        setInput("")
    }


    return (
        <div className="navi-drawer">
            <input
            type="search"
                className="search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => show()}
                onBlur={(e)=> hide(e)}
                placeholder="Search..."
            />
            <div className="search-container" onBlur={(e) => hide(e)}>
                <div className="search-results hidden">
                    {songs && (songs.length > 0 && input?.length > 0 ?
                    <div>
                        <div className="search-card-title" onMouseDown={(e) => hide(e)}>Songs</div>
                        {songs.map((song) => (
                            <div key={song.id} className="search-card" onMouseDown={() => reset1(song.album_id)}>
                                {song?.song_name}
                            </div>))}
                    </div>
                        : (input?.length > 0 ? <div className="search-none">No Songs</div> :
                            <div className="search-none hidden">No Songs</div>)
                    )}
                    {albums && (albums.length > 0 && input?.length > 0 ?
                    <div>
                        <div className="search-card-title" onMouseDown={(e) => hide(e)}>Albums</div>
                        {albums.map((album) => (
                                <div key={album.id} className="search-card" onMouseDown={() => reset1(album.id)}>
                                    {album.album_name}
                                </div>))}
                    </div>
                                : (input?.length > 0 ? <div className="search-none">No Albums</div> :
                            <div className="search-none hidden">No Albums</div>))}
                    {playlists && (playlists.length > 0 && input?.length > 0 ?
                    <div>
                        <div className="search-card-title" onMouseDown={(e) => hide(e)}>Playlists</div>
                        {playlists.map((playlists) => (
                            <div key={playlists.id} className="search-card" onMouseDown={() => reset2(playlists.id)}>
                                {playlists?.playlist_name}
                            </div>))}
                    </div>
                        : (input?.length > 0 ? <div className="search-none">No Playlist</div> :
                            <div className="search-none hidden">No Playlist</div>)
                    )}
                </div>

            </div>
            {isLoaded && sessionUser && (
                <div>
                    <div className="create-btns">
                        <div className="create-playlist-btn">
                            <OpenModalButton
                                buttonText="Create Playlist"
                                modalComponent={<PlaylistFormModal />}
                            />
                            <span>Create Playlist</span>
                        </div>
                        <div className="create-album-btn">
                            <OpenModalButton
                                buttonText="Create Album"
                                modalComponent={<CreateAlbumFormModal />}
                            />
                            <span>Create Album</span>
                        </div>
                    </div>
                    <div><SidebarList /></div>
                </div>
            )}


        </div>
    )
};

export default SideNav;
