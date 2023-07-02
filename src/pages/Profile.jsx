import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onUserStateChange } from '../firebase';
import { setUser } from '../redux/modules/user';
import ModifyProfile from '../components/porfile/ModifyProfile';
import Modal from '../components/common/Modal';
import { createPortal } from 'react-dom';
import { modifyProfileModalActive } from '../redux/modules/modalState';
import UserPosts from '../components/porfile/UserPosts';
import ReadPetInfo from '../components/porfile/ReadPetInfo';
import { styled } from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';

export default function Profile({ posts }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { displayName, photoURL, email } = userState;
  const modifyModalState = useSelector((state) => state.modalState.modifyProfileModalState);

  useEffect(() => {
    onUserStateChange((user) => {
      dispatch(setUser(user));
    });
  }, []);

  return (
    <main>
      <StUserProfile>
        <h2>
          {displayName}{' '}
          <button
            className="btn-modify-profile"
            title="내 정보 수정하기"
            onClick={() => dispatch(modifyProfileModalActive())}
          >
            <FaPencilAlt />
          </button>
        </h2>
        <span className="user-email">({email})</span>
        {modifyModalState &&
          createPortal(
            <Modal>
              <ModifyProfile />
            </Modal>,
            document.body
          )}
        <StProfileImg imgUrl={photoURL} />
      </StUserProfile>
      <ReadPetInfo />
      <UserPosts posts={posts} />
    </main>
  );
}

const StUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  min-width: 992px;
  margin: 0 auto;
  padding: 40px 16px;

  & h2 {
    display: flex;
    align-items: center;
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
  }
  & .user-email {
    font-size: 1rem;
    color: #777;
  }
  & .btn-modify-profile {
    background-color: transparent;
    border: 0;
    transform: translateY(2px);
    cursor: pointer;

    & svg {
      font-size: 1.1rem;
      color: #ffb200;
      transition: 0.5s;
    }

    &:hover svg {
      transform: scale(1.2);
    }
  }
`;

const StProfileImg = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 1rem;
  border-radius: 50%;
  overflow: hidden;
  color: ${(props) => props.color};
  background: ${(props) => `center / cover url(${props.imgUrl}) no-repeat`};
`;
