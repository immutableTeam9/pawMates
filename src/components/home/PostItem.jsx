import React, { useState } from 'react';
import ModifyPost from './ModifyPost';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../Modal';

const PostItem = ({ post, setPosts }) => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const deletePost = async (userId) => {
    if (userState === null) {
      alert('권한이 없습니다!');
    } else if (userId === userState.uid) {
      if (window.confirm('정말 삭제하시겠습니다?')) {
        const postRef = doc(db, 'posts', post.id);
        await deleteDoc(postRef);
        setPosts((prev) => {
          return prev.filter((element) => element.id !== post.id);
        });
        alert('삭제 되었습니다.');
      }
    } else if (userId !== userState.uid) {
      alert('권한이 없습니다!');
    }
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
      <p>작성자 : {post.nickName}</p>
      <p>{post.tags}</p>
      <button onClick={openModal}>수정</button>
      {isOpen && (
        <Modal>
          <ModifyPost
            closeModal={closeModal}
            post={post}
            setPosts={setPosts}
            postId={post.postId}
            imgName={post.imgName}
          ></ModifyPost>
        </Modal>
      )}
      <button onClick={() => deletePost(post.userId)}>삭제</button>

      <button
        onClick={() => {
          navigate(`/detail/${post.id}`);
        }}
      >
        상세보기
      </button>
    </div>
  );
};

export default PostItem;
