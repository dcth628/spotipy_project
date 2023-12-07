import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistDetailsFetch, likePlaylist, unlikePlaylist } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import RemoveSongModal from "./RemoveSongModal";
import OpenPlayer from "../MusicPlayer/OpenPlayer";
import PlaylistSongLike from "../SongLike/playlistLikes";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import './PlaylistDetails.css'


const PlaylistDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { playlistId } = useParams();
    const playlist = useSelector(state=>state?.playlists[playlistId]);
    const sessionUser = useSelector(state=>state?.session?.user);

    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    const songLengthFunc = (data) => {
        const sec = data % 60
        const min = (data - sec) / 60
        if (sec === 0) {
            return `${min} min 00 sec`
        }
        if (sec < 10) {
            return `${min} min 0${sec} sec`
        }
        return `${min} min ${sec} sec`
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const new_like = {
            user_id: sessionUser.id,
            likable_id: playlistId,
            likable_type: 'playlist'
        }
        const createdLike = await dispatch(likePlaylist(new_like))

        if (createdLike) {
            dispatch(PlaylistDetailsFetch(playlistId))
            history.push(`/playlists/${playlistId}`)
        }
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        await dispatch(unlikePlaylist(playlistId))
        await dispatch(PlaylistDetailsFetch(playlistId))
        history.push(`/playlists/${playlistId}`)
    };


    let count = 0


    const songLengthsArr = playlist?.songs?.map(song => song.songs.song_length);
    const summedSongs = songLengthsArr?.reduce((total, length) => total + length, null);


    return (
        <div className="detail-page">
            {playlist && (
                <div>
                    <div className="header">
                        <span>
                            <img className="playlist-img" src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" />
                        </span>
                        <span className="playlist-details">
                            <p>Playlist</p>
                            <h1>{playlist.playlist_name}</h1>
                            <p><span>{playlist.owner_name}</span>
                            {playlist?.songs ? (
                                <>
                                    <span className="playlist-description">{playlist?.songs.length} Songs ・</span>
                                    <span className="playlist-time">
                                        {Math.floor(summedSongs / 3600)} hr {Math.floor(summedSongs / 60)} min {summedSongs % 60} sec
                                    </span>
                                </>
                            ): null}
                            </p>
                            <div>
                                {playlist?.likable_id?.length >= 2 ? (
                                <div>
                                    <div>{playlist.likable_id.length} Likes</div>
                                </div>
                                ): (
                                <div>
                                    <div>{playlist.likable_id.length || 0} Like</div>
                                </div>
                                )}
                            </div>

                        </span>
                    </div>

                <div className="playlist-buttons">
                    {playlist && (<OpenPlayer type='playlists' typeId={playlist.id} />)}
                    {sessionUser && playlist?.liked_user_id ?((playlist?.liked_user_id?.filter((id) => id == sessionUser?.id).length > 0 ?
                                <span className="like-input">
                                    <i className="fas fa-heart true"
                                        onClick={handleCancelClick}></i>
                                </span>
                                :
                                <span className="like-input">
                                    <i className="far fa-heart false"
                                        onClick={handleClick}></i>
                                </span>
                    )) : <></>}
                    {sessionUser && sessionUser?.id === playlist?.owner_id && (
                        <div>
                            <OpenModalButton
                                buttonText={"Edit Playlist"}
                                modalComponent={<EditPlaylistModal playlistId={playlistId} />}
                            />
                            <OpenModalButton
                                buttonText={"Delete Album"}
                                modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
                            />
                        </div>
                    )}
                </div>
                <table className="playlist-table">
                    <tr className="song-header">
                        <th>#</th>
                        <th >Title</th>
                        <th ><i className="far fa-clock"></i></th>
                        <th></th>
                    </tr>
                {(playlist.songs ? playlist.songs?.map(song =>
                    <tr key={song.id}>
                        <td>{count += 1}.</td>
                        <td>{song.songs.song_name}</td>
                        <td>{songLengthFunc(song.songs.song_length)}</td>
                        <td className="song-button">
                        <OpenPlayer type='songs' typeId={song.id} />
                            <span><PlaylistSongLike song={song.songs} playlistId={playlistId} /></span>
                            {sessionUser && sessionUser.id === playlist.owner_id ? (
                                <span className="delete-song-button">
                                    <OpenModalButton
                                        buttonText={"Delete song"}
                                        modalComponent={<RemoveSongModal songId={song.id} playlistId={playlistId} />}/>
                                </span>
                            ): null}
                        </td>
                    </tr>)
                    : <div>No Songs </div>)}
                </table>
            </div>
        )}
    </div>
    )
};


export default PlaylistDetails
