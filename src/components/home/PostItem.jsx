import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ post }) => {
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
