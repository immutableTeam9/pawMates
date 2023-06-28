import React, { useState } from 'react';
import ModifyPost from './ModifyPost';
import { styled } from 'styled-components';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const PostItem = ({ post, setPosts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니다?')) {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);

      setPosts((prev) => {
        return prev.filter((element) => element.id !== post.id);
      });
      alert('삭제 되었습니다.');
    } else return;
  };

  return (
    <div
      key={post.id}
      style={{
        border: '1px solid black',
        margin: '10px',
        padding: '10px'
      }}
    >
      {post.imgURL ? (
        <img
          src={post.imgURL}
          style={{
            width: '20%',
            height: '30%'
          }}
        />
      ) : null}
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>작성자 : {post.userId}</p>
      <button onClick={openModal}>수정</button>
      {isOpen && (
        <StModalBox>
          <StModalContents>
            <ModifyPost closeModal={closeModal} post={post} setPosts={setPosts}></ModifyPost>
          </StModalContents>
        </StModalBox>
      )}
      <button onClick={deletePost}>삭제</button>
    </div>
  );
};

export default PostItem;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 50%;
  height: 50%;
  border-radius: 12px;
`;
