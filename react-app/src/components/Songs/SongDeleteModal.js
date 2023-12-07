import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteSongThunk } from "../../store/song";
import { getAlbumDetail } from "../../store/album";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import './SongDeleteModal.css'


export default function SongDeleteModal({ songId, albumId }){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSongThunk(songId))
        await dispatch(getAlbumDetail(albumId))
        await closeModal()
        await history.push(`/albums/${albumId}`)
    }

    return (
        <>
            <div className="delete-confirmation-form">
                <h1 className="delete-title">Confirm Delete</h1>
                <div className="delete-confirm">Are you sure you want to remove this song?</div>
                <div className="delete-buttons">
                    <button className="delete-button" onClick={handleDelete}>Yes</button>
                    <button className="delete-button" onClick={closeModal}>No</button>
                </div>
            </div>
        </>
    )
}
