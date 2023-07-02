import { firebaseSignOut, onUserStateChange } from '../../firebase';
import SignIn from '../auth/SignIn';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/modules/user';
import Modal from './Modal';
import { signinModalActive, signupModalActive } from '../../redux/modules/modalState';
import SignUp from '../auth/SignUp';
import { initialSwitchOn } from '../../redux/modules/initialState';
import { Link, useNavigate } from 'react-router-dom';
import { PiPawPrintFill } from 'react-icons/pi';
import styled from 'styled-components';

function Header() {
  const initialState = useSelector((state) => state.initialState);
  const userState = useSelector((state) => state.user);
  const userStateBoolean = Boolean(Object.keys(userState).length);
  const navigate = useNavigate();

  const modalState = useSelector((state) => state.modalState);
  const dispatch = useDispatch();

  useEffect(() => {
    onUserStateChange((user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(initialSwitchOn());
      } else {
        dispatch(setUser(user));
        firebaseSignOut();
        navigate('/');
        dispatch(initialSwitchOn());
      }
    });
  }, []);

  const handelLogOut = (e) => {
    e.preventDefault();
    firebaseSignOut();
    navigate('/');
    console.log(userState);
  };

  if (!initialState) {
    return <div>Loading</div>;
  }

  return (
    <>
      <StHeader>
        <div className="inner">
          <h1>
            <Link to="/">
              <PiPawPrintFill />
              PAW MATES
            </Link>
          </h1>
          <nav>
            {!userStateBoolean && (
              <>
                <button className="join-login-btn" onClick={() => dispatch(signupModalActive())}>
                  회원가입
                </button>{' '}
                <button className="join-login-btn" onClick={() => dispatch(signinModalActive())}>
                  로그인
                </button>
              </>
            )}

            {typeof userState.displayName === 'string' && (
              <>
                <span className="user-name">{`${userState.displayName}님`} </span>
                <Link className="btn-mypage" to={`/profile/${userState.uid}`}>
                  MY PAGE
                </Link>{' '}
                <Link onClick={handelLogOut} className="btn-logout">
                  LOGOUT
                </Link>
              </>
            )}
          </nav>

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
        </div>
      </StHeader>
    </>
  );
}

export default Header;

const StHeader = styled.header`
  box-shadow: 0px 0px 9px 3px #00000014;

  & .inner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    min-width: 992px;
    height: 100px;
    margin: 0 auto;
    padding: 0 16px;
  }

  & nav {
    position: absolute;
    right: 16px;
  }
  & h1 > a {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: 'EF_jejudoldam';
    color: #239cff;

    & svg {
      transform: rotate(340deg);
    }
  }
  & a {
    text-decoration: none;
  }
  & button {
    cursor: pointer;
  }

  & .user-name {
    color: #239cff;
    font-weight: 700;
    margin-right: 16px;
  }
  & .btn-mypage {
    margin-right: 10px;
    letter-spacing: -1px;
    font-size: 14px;
    font-weight: 400;
    color: #777;
    text-decoration: underline;
  }
  & .btn-logout {
    border: 0;
    background: transparent;
    color: #777;
    letter-spacing: -1px;
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
  }
  & .join-login-btn {
    border: 0;
    background: transparent;
    font-size: 15px;
    font-weight: 700;
    color: #239cff;
  }
`;
