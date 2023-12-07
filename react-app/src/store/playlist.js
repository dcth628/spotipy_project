const LOAD_PLAYLISTS = 'playlist/LOAD_PLAYLISTS';
const DETAILS_PLAYLIST = 'playlist/DETAILS_PLAYLIST';
const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST';
const REMOVE_PLAYLIST = 'playlist/REMOVE_PLAYLIST';
const LIKE_PLAYLIST = 'playlist/LIKE_PLAYLIST';
const UNLIKE_PLAYLIST = 'playlist/UNLIKE_PLAYLIST';
const REMOVE_SONG = 'playlist/REMOVE_SONG';
const ADD_SONG = 'playlist/ADD_SONG';


const load = (playlists) => ({
    type: LOAD_PLAYLISTS,
    playlists
});

const details = (playlist) => ({
    type: DETAILS_PLAYLIST,
    playlist
});

const create = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist
});

const remove = (playlistId) => ({
    type: REMOVE_PLAYLIST,
    playlistId
});

const like = (album) => ({
    type: LIKE_PLAYLIST,
    album
});

const unlike = (album) => ({
    type: UNLIKE_PLAYLIST,
    album
});

const removeSong = (songId, playlistId) => ({
    type: REMOVE_SONG,
    songId, playlistId
});

const addSong = (songId, playlistId) => ({
    type: ADD_SONG,
    songId, playlistId
})

export const getAllPlaylists = () => async (dispatch) => {
    const response = await fetch(`/api/playlists`);

    if (response.ok) {
        const playlists = await response.json();
        dispatch(load(playlists))
        return playlists
    }
}


export const currentUserPlaylists = () => async (dispatch) => {
    const res = await fetch('/api/playlists/current');

    if (res.ok) {
        const playlists = await res.json();
        dispatch(load(playlists));
        return playlists;
    };
};


export const PlaylistDetailsFetch = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`);

    if (res.ok) {
        const playlist = await res.json();
        dispatch(details(playlist));
        return playlist;
    };
};

export const CreatePlaylist = (playlist) => async (dispatch) => {
    const { playlist_name } = playlist

    const res = await fetch('/api/playlists/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            playlist_name
        }),
    });

    if (res.ok) {
        const newPlaylist = await res.json()
        dispatch(create(newPlaylist));
        return newPlaylist;
    }
};

export const EditPlaylist = (playlist, id) => async (dispatch) => {
    const { playlist_name } = playlist

    const playlistFetch = await fetch (`/api/playlists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            playlist_name
        }),
    });

    if (playlistFetch.ok) {
        const updatedPlaylist = await playlistFetch.json();
        dispatch(create(updatedPlaylist))
        return updatedPlaylist;
    };
};

export const DeletePlaylist = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const playlist = await res.json();
        dispatch(remove(playlistId));
        return playlist;
    }
};

export const likePlaylist = (new_like) => async (dispatch) => {

    const res = await fetch(`/api/playlists/${new_like.likable_id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_like)
    });

    if (res.ok) {
        const liked_playlist = await res.json();
        dispatch(like(liked_playlist))
        return liked_playlist
    }
};

export const unlikePlaylist = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/likes`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const liked_playlist = await res.json();
        dispatch(unlike(liked_playlist))
        return liked_playlist
    }
};

export const RemoveSong = (playlistId, songId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE'
    });


    if (res.ok) {
        const deletedSong = await res.json();
        dispatch(removeSong())
        return deletedSong;
    }
};

export const AddSongFetch = (playlistId, songId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'POST'
    });

    if (res.ok) {
        const addedSong = await res.json();
        dispatch(addSong(playlistId, songId));
        return addedSong;
    }
}


const initalState = {};

export default function playlistReducer(state = initalState, action) {
    switch(action.type) {
        case LOAD_PLAYLISTS:
            return {...state, ...action.playlists}
        case DETAILS_PLAYLIST:
            return {...state,  [action.playlist.id]: action.playlist}
        case CREATE_PLAYLIST:
            return { ...state, [action.playlist.id]: action.playlist }
        case REMOVE_PLAYLIST:
            const newState = {...state};
            delete newState[action.playlistId]
            return newState
        case REMOVE_SONG:
            const updatedPlaylist = { ...state[action.playlistId] };
            const updatedSongs = updatedPlaylist.songs ?
            updatedPlaylist.songs.filter(
                song => song.id
              ) : [];
            updatedPlaylist.songs = updatedSongs;
            return { ...state, [action.playlistId]: updatedPlaylist };
        default:
            return state
    }
};
