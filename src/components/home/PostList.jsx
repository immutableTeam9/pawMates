import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const PostList = ({ posts, setPosts }) => {
  return (
    <div>
      <h2>게시물</h2>
      {posts
        .sort((a, b) => {
          return b.date - a.date;
        })
        .map((post) => {
          console.log('이건 포스트임', post);
          return <PostItem key={post.id} post={post} setPosts={setPosts}></PostItem>;
        })}
    </div>
  );
};

export default PostList;
