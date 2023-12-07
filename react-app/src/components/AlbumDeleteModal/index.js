import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as albumActions from '../../store/album';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './AlbumDeleteModal.css'
import { deleteAlbum } from "../../store/album";
import { currentUserAlbums } from "../../store/album";


const ConfirmDeleteAlbumModal = ({ albumId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory()


  const DeleteAlbum = async (e) => {
    e.preventDefault();
    await dispatch(deleteAlbum(albumId));
    closeModal();
    await dispatch(currentUserAlbums());
    await history.push('/collection')
  };

  return (
    <>
      <div className="delete-form">
        <h1 className="delete-title">Confirm Delete</h1>
        <div className="delete-confirm">Are you sure you want to delete this album</div>
        <div className="delete-buttons">
          <button className="delete-button" onClick={DeleteAlbum}>Yes (Delete)</button>
          <button className="delete-button" onClick={closeModal}>No </button>
        </div>
      </div>
    </>
  )
};

export default ConfirmDeleteAlbumModal
