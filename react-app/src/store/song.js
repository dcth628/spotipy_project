const ALL_SONGS = 'song/ALL_SONGS';
const GETONE_SONG = 'song/GETONE_SONG'
const ADD_SONG = 'song/ADD_SONG';
const DELETE_SONG = 'song/DELETE_SONG'
const LIKE_SONG = 'song/LIKE_SONG'
const UNLIKE_SONG = 'song/UNLIKE_SONG'

export const deleteSong = (songId) => ({
    type: DELETE_SONG,
    songId,
})
const getone = (song) => ({
    type: GETONE_SONG,
    song
})

export const addSong = (songData) => ({
    type: ADD_SONG,
    songData
})

export const allSongs = (songs) => ({
    type: ALL_SONGS,
    songs
});

const like = (song) => ({
    type: LIKE_SONG,
    song
})

const unlike = (song) => ({
    type: UNLIKE_SONG,
    song
})


export const deleteSongThunk = (songId) => async (dispatch) => {

    const response = await fetch(`/api/albums/songs/${songId}`, {
        method: 'DELETE',
    })


    if (response.ok){
        dispatch(deleteSong(songId))
        return response.json()
    }
}

export const addNewSongFetch = (songData) => async (dispatch) => {
    const { song_name, song_length, song_src, album_id } = songData
    const response = await fetch(`/api/albums/${album_id}/songs`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        // HAD TO DESTRUCTURE THE INPUTS TO HAVE THEM IN
        // THE PROPER STRUCTURE TO GO TO THE SONG FORM
        body: JSON.stringify({
            song_name,
            song_length,
            song_src,
            album_id
        })
    });
    const newSong = await response.json();
    if (response.ok){
        dispatch(addSong(newSong))
        return newSong
    }
}

export const getSongDetail = (song) => async dispatch => {
    const response = await fetch(`/api/songs/${song}`)

    if (response.ok) {
        const song = await response.json();
        dispatch(getone(song));
        return song
    }
}

export const allSongsFetch = () => async (dispatch) => {
    const response = await fetch(`/api/songs`);

    if (response.ok) {
        const songData = await response.json();
        dispatch(allSongs(songData));
        return songData;
    };
};

export const likeSong = (new_like) => async dispatch => {
    const response = await fetch(`/api/songs/${new_like.likable_id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_like)
    });


    if (response.ok) {
        const liked_song = await response.json();
        dispatch(like(liked_song))
        return liked_song
    }
};

export const unLikeSong = (song) => async dispatch => {

    const response = await fetch(`/api/songs/${song}/likes`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const liked_song = await response.json();
        dispatch(unlike(song))
        return liked_song
    }
};




const initalState = {};

export default function songReducer(state = initalState, action) {
    switch(action.type) {
        case ALL_SONGS:
            return {...state, ...action.songs}

        case ADD_SONG:
            return {...state, [action.songData.id]: action.songData}

        case DELETE_SONG:
            const removeState = {...state}
            delete removeState[action.songId]
            return removeState
        case LIKE_SONG:
            return {...state, ...action.songs}
        case UNLIKE_SONG:
            const unlikeSong = {...state}
            delete unlikeSong[action.songId]
            return unlikeSong

        case GETONE_SONG:
            return {[action.song.id]: action.song}
        default:
            return state
    };
};
