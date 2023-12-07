import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButton.css'

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  if (buttonText === 'Create Album') {
    return (<i onClick={onClick} className="fa fa-plus" />)
  } else if (buttonText === 'Create Playlist') {
    return (<i onClick={onClick} className="fa fa-plus" />)
  } else if (buttonText === 'Edit Album') {
    return (<i onClick={onClick} className="fa fa-edit" />)
  } else if (buttonText === 'Delete Album') {
    return (<i onClick={onClick} className="fas fa-times" />)
  } else if (buttonText === 'Add song') {
    return (<i onClick={onClick} className="fa fa-plus" />)
  } else if (buttonText === 'Delete song') {
    return (<i onClick={onClick} className="fas fa-times" />)
  } else if (buttonText === 'Edit Playlist') {
    return (<i onClick={onClick} className="fa fa-edit" />)
  } else if (buttonText === 'Delete Album') {
    return (<i onClick={onClick} className="fas fa-times" />)
  } else if (buttonText === 'Add Song to Playlist') {
    return (<i onClick={onClick} className="fa fa-plus" />)
  } else if (buttonText === 'About Devs') {
    return (<button className='about-devs-btn' onClick={onClick}>{buttonText}</button>)
  }
  return (<button onClick={onClick}>{buttonText}</button>);
}

 export default OpenModalButton;
