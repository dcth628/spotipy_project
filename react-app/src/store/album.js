const GET_ALBUMS = 'album/LOAD_ALBUM'
const GETONE_ALBUM = 'album/GETONE_ALBUM'
const CREATE_ALBUM = 'album/CREATE_ALBUM'
const EDIT_ALBUM = 'album/EDIT_ALBUM'
const REMOVE_ALBUM = 'album/REMOVE_ALBUM'
const LIKE_ALBUM = 'album/LIKE_ALBUM'
const UNLIKE_ALBUM = 'album/UNLIKE_ALBUM'


const load = (albums) => ({
    type: GET_ALBUMS,
    albums
})

const getone = (album) => ({
    type: GETONE_ALBUM,
    album
})

const create = (album) => ({
    type: CREATE_ALBUM,
    album
})

const edit = (album) => ({
    type: EDIT_ALBUM,
    album
})

const remove = (albumId) => ({
    type: REMOVE_ALBUM,
    albumId
})

const like = (album) => ({
    type: LIKE_ALBUM,
    album
})

const unlike = (album) => ({
    type: UNLIKE_ALBUM,
    album
})

export const getAllAlbums = () => async (dispatch) => {
    const response = await fetch(`/api/albums`);

    if (response.ok) {
        const albums = await response.json();
        dispatch(load(albums))
        return albums
    }
}

export const currentUserAlbums = () => async (dispatch) => {
    const res = await fetch('/api/albums/current')
    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
        return albums
    }
}

export const getAlbumDetail = (albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`)

    if (response.ok) {
        const album = await response.json();
        dispatch(getone(album));
        return album
    }
}

export const createAlbum = (album) => async dispatch => {

    const { album_name, year_recorded, album_img } = album;

    const response = await fetch('/api/albums', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            album_name,
            year_recorded,
            album_img,
        })
    });

    const newAlbum = await response.json()
    dispatch(create(newAlbum));
    return newAlbum;
}

export const editAlbum = (album, albumId) => async disptach => {
    const { id, album_name, year_recorded, album_img } = album;

    const response = await fetch(`/api/albums/${album.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id : id,
            album_name,
            year_recorded,
            album_img,
        })
    })

    if (response.ok) {
        const album = await response.json();
        disptach(edit(album))
        return album
    }
};

export const deleteAlbum = albumId => async dispatch => {

    const response = await fetch(`/api/albums/${albumId}/`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const album = await response.json();
        dispatch(remove(albumId))
        return album
    }
}

export const likeAlbum = (new_like) => async dispatch => {

    const response = await fetch(`/api/albums/${new_like.likable_id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_like)
    });

    if (response.ok) {
        const liked_album = await response.json();
        dispatch(like(liked_album))
        return liked_album
    }
}

export const unLikeAlbum = albumId => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/likes`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const liked_album = await response.json();
        dispatch(unlike(liked_album))
        return liked_album
    }
}


const initialState = {};

export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALBUMS:
            return { ...state, ...action.albums };
        case GETONE_ALBUM:
            return { ...state, [action.album.id]: action.album };
        case CREATE_ALBUM:
            return { ...state, [action.album.id]: action.album };
        case EDIT_ALBUM:
            return { ...state, [action.album.id]: action.album };
        case REMOVE_ALBUM:
            const newState = {...state};
            delete newState[action.albumId]
            return newState
        default:
            return state
    }
}
