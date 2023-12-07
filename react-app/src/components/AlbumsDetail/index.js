import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail, likeAlbum, unLikeAlbum } from '../../store/album'
import { allSongsFetch, likeSong, unLikeSong } from "../../store/song";
import { useEffect, useState, useRef } from "react";
import EditAlbumFormModal from "../AlbumEdit";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteAlbumModal from "../AlbumDeleteModal";
import SongAddModal from "../Songs/SongAddModal";
import SongDeleteModal from "../Songs/SongDeleteModal";
import AddSongModal from "../Playlists/AddSongModal";
import './AlbumsDetail.css'
import SongLike from "../SongLike";
import OpenPlayer from "../MusicPlayer/OpenPlayer";



const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    const history = useHistory()
    let album = useSelector(state => state?.albums[albumId]);
    const sessionUser = useSelector(state => state?.session?.user);
    const [like, setLike] = useState(false);

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch, albumId])

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
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const new_like = {
            user_id: sessionUser.id,
            likable_id: albumId,
            likable_type: "album"
        }
        let createdLike = await dispatch(likeAlbum(new_like))
        if (createdLike) {

            dispatch(getAlbumDetail(albumId))
            history.push(`/albums/${albumId}`)
        }
    }

    const handleCancelClick = async (e) => {
        e.preventDefault();
        await dispatch(unLikeAlbum(albumId))
        await dispatch(getAlbumDetail(albumId))
        history.push(`/albums/${albumId}`)
    }


    let count = 0


    const songLengthsArr = album?.songs?.map(song => song.song_length);
    const summedSongs = songLengthsArr?.reduce((total, length) => total + length, null);

    return (
        <div id="detail-page">
            {album &&
                (
                    <>
                        <div className="album-header">
                            <div>
                                <img id="album-image" src={album.album_img} alt="" />
                            </div>
                            <div className="album-details">
                                <p>Album</p>

                                <h1>{album.album_name}</h1>
                                <p><span >{album.year_recorded}</span>
                                    <span className="album-description">{album.username}</span>
                                    <span className="album-description">{album.songs?.length} songs ・ </span>
                                    {album?.songs ? (
                                        <>
                                            <span className="album-length">
                                                {Math.floor(summedSongs / 3600)} hr {Math.floor(summedSongs / 60)} min {summedSongs % 60} sec
                                            </span>
                                        </>
                                    ) : null}
                                </p>
                                <p>{album?.likable_id.length >= 2 ? (
                                    <div>
                                        <div>{album.likable_id.length} Likes</div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>{album.likable_id.length || 0} Like</div>
                                    </div>
                                )}</p>
                            </div>
                        </div>

                        <div className="album-buttons">
                            {album && (<OpenPlayer type='albums' typeId={album.id} />)}
                            {sessionUser && album?.liked_user_id ? ((album?.liked_user_id.filter((id) => id == sessionUser.id).length > 0 ?
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
                            {sessionUser && sessionUser.id === album.user_id ?
                                <>
                                    <OpenModalButton
                                        buttonText={"Edit Album"}
                                        modalComponent={<EditAlbumFormModal album={album} />} />
                                    <OpenModalButton
                                        buttonText={"Delete Album"}
                                        modalComponent={<ConfirmDeleteAlbumModal albumId={album.id} />} />
                                    <OpenModalButton
                                        buttonText={"Add song"}
                                        modalComponent={<SongAddModal albumId={album.id} />}
                                    />
                                </> : <></>
                            }
                        </div>
                        <table className="album-table">
                            <tr className="song-header">
                                <th >#</th>
                                <th >Title</th>
                                <th >Album</th>
                                <th ><i className="far fa-clock"></i></th>
                                <th></th>
                            </tr>
                            {(album.songs ? album?.songs.map(song =>
                                <tr key={song.id}>
                                    <td>{count += 1}.</td>
                                    <td>{song.song_name}</td>
                                    <td>{album.album_name}</td>
                                    <td className="">{songLengthFunc(song.song_length)}</td>
                                    <td className="song-button">
                                        <OpenPlayer type='songs' typeId={song.id} />
                                        <span><SongLike song={song} albumId={albumId} /></span>
                                        {sessionUser && sessionUser.id === album.user_id ?
                                            <>
                                                <span className="delete-song-button">
                                                    <OpenModalButton
                                                        buttonText={"Delete song"}
                                                        modalComponent={<SongDeleteModal albumId={albumId} songId={song.id} />}
                                                    />
                                                </span>
                                            </>
                                            : <></>}
                                        {sessionUser && (<div className="add-song-button">
                                            <OpenModalButton
                                                buttonText="Add Song to Playlist"
                                                modalComponent={<AddSongModal songId={song.id} />}
                                            />
                                        </div>)}
                                    </td>
                                </tr>)
                                : <div>No Songs</div>)}

                        </table>
                    </>
                )
            }
        </div>
    )
}


export default AlbumDetials
