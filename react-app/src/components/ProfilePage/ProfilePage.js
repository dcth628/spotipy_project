import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { currentUserPlaylists } from "../../store/playlist";
import { currentUserAlbums } from "../../store/album";
import OpenPlayer from "../MusicPlayer/OpenPlayer"
import './profilePage.css'
import { getAllAlbums } from "../../store/album";
import { getAllPlaylists } from "../../store/playlist";
import { likedAlbums, likedPlaylists, likedSongs } from "../../store/like";


export default function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const playlists = useSelector(state => state?.playlists)
    const albums = useSelector(state => state?.albums)
    const likes = useSelector(state => state?.like)
    const likedAlbum = Object.values(likes).filter(like => like.likable_type == "album")
    const likedPlaylist = Object.values(likes).filter(like => like.likable_type == "playlist")
    const likedSong = Object.values(likes).filter(like => like.likable_type == "song")
    const { user } = useSelector(state => state.session)

    console.log(likedSong, '--playlist')
    let userAlbums = []
    if (user) {
        userAlbums = Object.values(albums).filter((album) => album.user_id === user.id)
    }

    let userPlaylists = []
    if (user) {
        userPlaylists = Object.values(playlists).filter((playlists) => playlists.owner_id === user.id)
    }

    useEffect(() => {
        if (user) {
            dispatch(currentUserPlaylists());
            dispatch(currentUserAlbums());
            dispatch(likedAlbums())
            dispatch(likedPlaylists())
            dispatch(likedSongs())
        } else {
            dispatch(getAllAlbums())
            dispatch(getAllPlaylists())
        }
    }, [dispatch, user])

    const albumClick = (e, id) => {
        e.preventDefault();
        history.push(`/albums/${id}`);
    };

    const playlistClick = (e, id) => {
        e.preventDefault();
        history.push(`/playlists/${id}`);
    };

    async function clickAttempt(){
    }

    return (
        <>
            {user ?
                <div className='profile-page-whole'>
                    <div className="profile-page-header">
                        <img src={user.user_image} alt={`userimg${user.id}`} id="user-img" height={200} width={200} />
                        <div className="user-data">
                            <h2>{user.username}'s Profile</h2>
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                    </div>
                    <div className="profile-section">
                        <div className="user-music">
                            {userPlaylists &&
                                <div className="playlist-display">
                                    <h3>Playlists</h3>
                                    <div className="album-bar" >
                                        {userPlaylists.map(playlist => (
                                            <div className="playlist-card" key={playlist.id} onClick={(e) => playlistClick(e, playlist.id)}>
                                                <img className="profile-playlist-img" alt={`playlist-${playlist.id}`} src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" height={90} width={90} />
                                                <div className="albumName">{playlist.playlist_name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <div className="album-display">
                                <h3>Albums</h3>
                                <div className="album-bar">
                                    {userAlbums.map(album => (
                                        <div className="album-card" key={album.id} onClick={(e) => albumClick(e, album.id)}>
                                            <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90} />
                                            <div className="albumName">{album.album_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="album-display">
                                <h3>Liked Songs</h3>
                                <div className="album-bar">
                                    {likedSong.map(song => (
                                        <div className="album-card" key={song.id} onClick={(e) => albumClick(e, song.album_id)}>
                                            <img alt="" className="profile-playlist-img" src='https://res.cloudinary.com/djclmc80y/image/upload/v1690941936/liked-songs-spotipy_cnlirz.jpg' height={90} width={90}/>
                                            <div className="albumName">{song.song_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="section-three">
                            {likedPlaylist &&
                                <div className="playlist-display">
                                    <h3>Liked Playlists</h3>
                                    <div className="album-bar" >
                                        {likedPlaylist.map(playlist => (
                                            <div className="playlist-card" key={playlist.id} onClick={(e) => playlistClick(e, playlist.playlist_id)}>
                                                <img className="profile-playlist-img" alt={`playlist-${playlist.id}`} src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" height={90} width={90} />
                                                <div className="albumName">{playlist.playlist_name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <div className="album-display">
                                <h3>Liked Albums</h3>
                                <div className="album-bar">
                                    {likedAlbum.map(album => (
                                        <div className="album-card" key={album.id} onClick={(e) => albumClick(e, album.id)}>
                                            <div>
                                            <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90} />
                                                <div className="albumName" >{album.album_name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='no-profile'>
                    <div className="no-profile-header">
                        <img alt='spotify-symbol' src='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684030309/spotify-logo_mvjr5k.jpg' height={50} width={50} />
                        <h1>SpotiPy</h1>
                    </div>
                    <h2>All Albums</h2>
                    <div className="no-user-all-albums" onClick={clickAttempt}>
                        {Object.values(albums).map(album => (
                            <div className="album-card" key={album.id}>
                                <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90} />
                                <div className="albumName">{album.album_name}</div>
                            </div>
                        ))}
                    </div>
                    <h2>All Playlists</h2>
                    <div className="no-user-all-albums" onClick={clickAttempt}>
                        {Object.values(playlists).map(playlist => (
                            <div className="album-card" key={playlist.id}>
                                <img height={90} width={90} id='album-img' alt='playlist-stock-img' src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" />
                                <div className="albumName">{playlist.playlist_name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
