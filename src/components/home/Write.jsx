import React, { useState } from 'react';
import Modal from '../common/Modal';
import WritePost from './WritePost';

const Write = ({ posts, setPosts, fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>글 작성하기</button>
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
