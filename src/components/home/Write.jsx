import React, { useState } from 'react';
import Modal from '../common/Modal';
import WritePost from './WritePost';
import { useSelector } from 'react-redux';
import { keyframes, styled } from 'styled-components';

const Write = ({ posts, setPosts, fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.user);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const writeButtonHandler = () => {
    if (!Object.keys(userState).length) {
      alert('로그인이 되어 있지 않습니다!');
    } else {
      openModal();
    }
  };
  return (
    <div className="write-btn">
      <StWriteBtn onClick={writeButtonHandler}>글쓰기</StWriteBtn>
      {isOpen && (
        <>
          <Modal>
            <WritePost posts={posts} setPosts={setPosts} fetchData={fetchData} closeModal={closeModal}></WritePost>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Write;

const fadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;
const fadeOut = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const StWriteBtn = styled.button`
  cursor: pointer;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #239cff;
  color: white;
  margin: 10px;
  transition: 0.3s ease-out;
  font-size: 22px;
  font-weight: 400;

  &:hover {
    background-color: #277bc0;
  }
`;
