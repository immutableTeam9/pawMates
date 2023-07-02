import React from 'react';
import PostItem from './PostItem';
import { styled } from 'styled-components';

const PostList = ({ posts }) => {
  return (
    <StPostContainer>
      {posts
        .sort((a, b) => {
          return b.date - a.date;
        })
        .map((post) => {
          return <PostItem key={post.id} post={post} posts={posts}></PostItem>;
        })}
    </StPostContainer>
  );
};

export default PostList;

export const StPostContainer = styled.div`
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  column-gap: 20px;
  padding: 30px;

  @media only screen and (max-width: 1200px) {
    column-count: 2;
  }
  @media only screen and (min-width: 992px) {
    column-count: 3;
  }

  & .post-item {
    display: grid;
    grid-template-rows: 1fr auto;
    margin-bottom: 20px;
    break-inside: avoid;
  }

  & .post-item > img {
    width: 100%;
    margin-bottom: 10px;
  }

  & .noPost {
    display: flex;
    justify-content: center;
    width: 1200px;
    min-width: 992px;
    color: #777;
    font-size: 20px;

    @media only screen and (max-width: 1200px) {
      width: 992px;
    }
    @media only screen and (min-width: 1199px) {
      width: 1200px;
    }
  }
`;
