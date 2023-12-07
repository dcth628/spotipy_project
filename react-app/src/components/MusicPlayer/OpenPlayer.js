import React from 'react';
import { useDispatch } from 'react-redux';

import { currentTracksFetch } from '../../store/playerState';
import './OpenPlayer.css'

export default function OpenPlayer ({
    type,
    typeId
}) {
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();
        dispatch(currentTracksFetch(type, typeId));
    }

    return (
        <button className='player-button' onClick={onClick}> <i className="fas fa-play-circle"></i> </button>
    )
}
