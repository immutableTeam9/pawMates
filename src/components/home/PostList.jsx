import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  return (
    <div>
      <h2>게시물</h2>
      {posts
        .sort((a, b) => {
          return b.date - a.date;
        })
        .map((post) => {
          return <PostItem key={post.id} post={post} posts={posts}></PostItem>;
        })}
    </div>
  );
};

export default PostList;
