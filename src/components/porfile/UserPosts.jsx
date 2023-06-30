import React, { useEffect, useState } from 'react';
import PostItem from '../home/PostItem';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const UserPosts = () => {
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [petInfos, setPetInfos] = useState([]);
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
      case 'petInfo':
        setPetInfos(initialArr);
      default:
        return;
    }
  };

  useEffect(() => {
    fetchData('posts');
    fetchData('petInfo');
  }, []);

  const userPetInfo = petInfos.find((petInfo) => petInfo.ownerId === id);
  return (
    <>
      <div>
        <h2>반려동물 정보</h2>
        {userPetInfo ? (
          <div>
            <p>{userPetInfo.name}</p>
            <p>{userPetInfo.type}</p>
            <p>{userPetInfo.age}</p>
            <p>{userPetInfo.gender}</p>
          </div>
        ) : (
          <div>등록한 반려동물 정보가 없습니다.</div>
        )}
      </div>
      <div>
        <h2>작성한 게시물</h2>
        {posts
          .filter((post) => post.userId === id)
          .map((post) => {
            return <PostItem key={post.id} post={post}></PostItem>;
          })}
      </div>
    </>
  );
};

export default UserPosts;
