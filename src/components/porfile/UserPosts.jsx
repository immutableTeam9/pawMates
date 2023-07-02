import React, { useEffect, useState } from 'react';
import PostItem from '../home/PostItem';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { StPostContainer } from '../home/PostList';

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const fetchData = async (collectionName) => {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const initialArr = [];
    querySnapshot.forEach((doc) => {
      initialArr.push({ id: doc.id, ...doc.data() });
    });
    switch (collectionName) {
      case 'posts':
        setPosts(initialArr);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    fetchData('posts');
  }, []);

  return (
    <>
      <div>
        <h2>작성한 게시물</h2>

        <StPostContainer>
          {posts
            .filter((post) => post.userId === id)
            .map((post) => {
              return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </StPostContainer>
      </div>
    </>
  );
};

export default UserPosts;
