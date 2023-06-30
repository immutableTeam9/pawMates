import React, { useState } from 'react';
import ModifyPost from './ModifyPost';
import { styled } from 'styled-components';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostItem = ({ post, setPosts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.user);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //삭제하기 버튼에 권한확인 추가 했는데 필요없으면 안써도 돼요~~~!~!~!!
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

  const navigate = useNavigate();
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
        <StModalBox>
          <StModalContents>
            <ModifyPost
              closeModal={closeModal}
              post={post}
              setPosts={setPosts}
              postId={post.postId}
              imgName={post.imgName}
            ></ModifyPost>
          </StModalContents>
        </StModalBox>
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
