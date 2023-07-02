import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  const splitTags = (tags) => {
    const tagsArr = tags.split(',');
    return tagsArr;
  };

  const getDivColor = (tag) => {
    switch (tag) {
      case '#강아지':
        return '#FFB6C1';
      case '#고양이':
        return '#87CEEB';
      case '#간식':
        return '#FFE0A3';
      case '#음식':
        return '#FFCC99';
      case '#병원':
        return '#AED6F1';
      default:
        return '#777';
    }
  };

  return (
    <Link to={`/detail/${post.id}`}>
      <StPostItem key={post.id} className="post-item">
        {post.imgURL ? <img src={post.imgURL} /> : null}
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>작성자 : {post.nickName}</p>
        {post.tags ? (
          <div className="tags">
            {splitTags(post.tags).map((tag) => {
              return <Stdiv bgColor={getDivColor(tag)}>{tag}</Stdiv>;
            })}
          </div>
        ) : null}
      </StPostItem>
    </Link>
  );
};

export default PostItem;

const StPostItem = styled.div`
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0px 0px 9px 5px #1c1c1c13;
  overflow: hidden;
  background-color: white;
  transition: 0.3s ease-out;

  & h3 {
    padding-left: 10px;
    font-weight: 700;
  }

  & p {
    padding-left: 10px;
    padding-right: 10px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  & .tags {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Stdiv = styled.div`
  background-color: #777;
  border-radius: 4px;
  padding: 3px;
  width: 60px;
  background-color: ${(props) => props.bgColor};
  margin: 10px 7px 0px 10px;
  text-align: center;
`;
