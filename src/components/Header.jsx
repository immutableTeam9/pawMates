import { firebaseSignOut, onUserStateChange } from '../firebase';
import SignIn from './SignIn';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/modules/user';
import Modal from './Modal';
import { signinModalActive, signupModalActive } from '../redux/modules/modalState';
import SignUp from './SignUp';
import { initialSwitchOn } from '../redux/modules/initialState';

function Header() {
  const initialState = useSelector((state) => state.initialState);
  const userState = useSelector((state) => state.user);
  const userStateBoolean = Boolean(Object.keys(userState).length);

  const modalState = useSelector((state) => state.modalState);
  const dispatch = useDispatch();

  useEffect(() => {
    onUserStateChange((user) => {
      dispatch(setUser(user));
      dispatch(initialSwitchOn());
    });
  }, []);

  const handelLogOut = (e) => {
    e.preventDefault();
    firebaseSignOut();
  };

  if (!initialState) {
    return <div>Loading</div>;
  }

  return (
    <>
      <header>
        {!userStateBoolean && (
          <>
            <button onClick={() => dispatch(signupModalActive())}>회원가입</button>{' '}
            <button onClick={() => dispatch(signinModalActive())}>로그인</button>
          </>
        )}

        {typeof userState.displayName === 'string' && (
          <>
            {`${userState.displayName}님`} <button onClick={handelLogOut}>로그아웃</button>
          </>
        )}

        {modalState.signUpModalState &&
          createPortal(
            <Modal>
              <SignUp />
            </Modal>,
            document.body
          )}

        {modalState.signInModalState &&
          createPortal(
            <Modal>
              <SignIn />
            </Modal>,
            document.body
          )}
      </header>
    </>
  );
}

export default Header;
