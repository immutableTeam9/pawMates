import React, { useState } from 'react';
import Modal from '../common/Modal';
import WritePost from './WritePost';
import { useSelector } from 'react-redux';

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
    <div>
      <button onClick={writeButtonHandler}>글 작성하기</button>
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
