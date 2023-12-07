const LOAD_LIKEDALBUM = 'like/LOAD_LIKEDALBUM'
const LOAD_LIKEDSONG = 'like/LOAD_LIKEDSONG'
const LOAD_LIKEDPLAYLIST = 'like/LOAD_LIKEDPLAYLIST'

const loadAlbums = (albums) => ({
    type: LOAD_LIKEDALBUM,
    albums
});

const loadSongs = (songs) => ({
    type: LOAD_LIKEDSONG,
    songs
});

const loadPlaylists = (playlists) => ({
    type: LOAD_LIKEDPLAYLIST,
    playlists
})

export const likedAlbums = () => async (dispatch) => {
    const response = await fetch('/api/likes/albums')

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAlbums(albums))
        return albums
    };
};

export const likedSongs = () => async (dispatch) => {
    const response = await fetch('/api/likes/songs')

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSongs(songs))
        return songs
    };
};

export const likedPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/likes/playlists')

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists))
        return playlists
    };
};

const initalState = {}

const likeReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOAD_LIKEDALBUM:
            return {...state, ...action.albums}
        case LOAD_LIKEDSONG:
            return {...state, ...action.songs}
        case LOAD_LIKEDPLAYLIST:
            return {...state, ...action.playlists}
        default:
            return state
    }
};

export default likeReducer
