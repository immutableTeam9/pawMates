import React, { useEffect, useState } from 'react';
import PostItem from '../home/PostItem';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const UserPosts = () => {
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    const q = query(collection(db, 'posts'));
    const querySnapshot = await getDocs(q);
    const initialPosts = [];
    querySnapshot.forEach((doc) => {
      initialPosts.push({ id: doc.id, ...doc.data() });
    });
    setPosts(initialPosts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>작성한 게시물</h2>
      {posts
        .filter((post) => post.userId === id)
        .map((post) => {
          return <PostItem key={post.id} post={post}></PostItem>;
        })}
    </div>
  );
};

export default UserPosts;
