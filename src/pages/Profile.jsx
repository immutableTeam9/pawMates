import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByUser, onUserStateChange } from '../firebase';
import { setUser } from '../redux/modules/user';
import ModifyProfile from '../components/ModifyProfile';
import Modal from '../components/Modal';
import { createPortal } from 'react-dom';
import { modifyProfileModalActive } from '../redux/modules/modalState';
import { Link } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { displayName, photoURL } = userState;

  const modifyModalState = useSelector((state) => state.modalState.modifyProfileModalState);

  useEffect(() => {
    onUserStateChange((user) => {
      dispatch(setUser(user));
    });
  }, []);

  return (
    <div>
      <Link to="/">go to Home</Link>
      <h2>{displayName}</h2>
      <button onClick={() => dispatch(modifyProfileModalActive())}>수정하기</button>
      {modifyModalState &&
        createPortal(
          <Modal>
            <ModifyProfile />
          </Modal>,
          document.body
        )}
      <div style={{ width: 150, height: 150, border: '1px solid black', borderRadius: '50%', overflow: 'hidden' }}>
        <img style={{ width: '100%' }} src={photoURL} alt={`${displayName} 프로필 이미지`} />
      </div>
    </div>
  );
}
