import React, { useEffect, useState } from 'react';
import PostItem from '../home/PostItem';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { StPostContainer } from '../home/PostList';
import { styled } from 'styled-components';

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
      <StHtwo>작성한 게시물</StHtwo>
      <div>
        <StPostContainer>
          {posts.filter((post) => post.userId === id).length > 0 ? (
            posts
              .filter((post) => post.userId === id)
              .map((post) => {
                return <PostItem key={post.id} post={post}></PostItem>;
              })
          ) : (
            <div className="noPost">작성한 게시물이 없습니다!</div>
          )}
        </StPostContainer>
      </div>
    </>
  );
};

export default UserPosts;

const StHtwo = styled.h2`
  min-width: 992px;
  text-align: center;
  margin-top: 50px;
  font-weight: 700;
`;
