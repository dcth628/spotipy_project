import React, { useState, useEffect, useRef } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/";
import { logout } from "../../store/session";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AboutDevsModal from "./AboutDevsModal";
import './ProfileButton.css'
import { deleteTracksThunk } from "../../store/playerState";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(deleteTracksThunk())
    await dispatch(logout());
    await history.push('/')
  };

  const createDemo = () => {
    return dispatch(login('demo@aa.io', 'password')).then(closeModal).then(history.push('/home'))
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <i className="fas fa-user-circle" onClick={openMenu} /> <span className="profile-btn" onClick={openMenu}>Profile</span>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>User: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>
              <button className="logout" onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <button className='demoUser' onClick={createDemo}>Demo User</button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
