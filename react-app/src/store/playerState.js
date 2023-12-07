const CURR_PLAY = 'player/CURR_PLAY'
const DEL_PLAY = 'player/DEL_PLAY'


const currentTracks = (tracks) => ({
    type: CURR_PLAY,
    tracks
})

const deleteTracks = () => ({
    type: DEL_PLAY
})


// export const currentTracksFetch = (type, id) => async (dispatch) => {
//     const response = await fetch(`/api/${type}/${id}/player`)


//     if (response.ok){
//         const trackData = await response.json();
//         dispatch(currentTracks(trackData));
//         return trackData;
//     }
// }

export const currentTracksFetch = (type, id) => async (dispatch) => {
    const response = await fetch(`/api/${type}/${id}/player`)


    if (response.ok){
        const trackData = await response.json();
        dispatch(currentTracks(trackData));
        return trackData;
    }
}

export const deleteTracksThunk = () => async (dispatch) => {
    dispatch(deleteTracks());
    return
}

const initalState = {};

export default function playerReducer(state = initalState, action) {
    switch(action.type) {
        case CURR_PLAY:
            return {...action.tracks}

        case DEL_PLAY:
            return initalState;

        default:
            return state;
    }
}
