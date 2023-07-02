import React, { useEffect, useState } from 'react';
import Search from '../components/home/Search';
import PostList from '../components/home/PostList';
import Write from '../components/home/Write';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { styled } from 'styled-components';

const Home = () => {
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
    <>
      <StDiv>
        <h1>
          포미츠!
          <br />
          반려동물 정보 공유 서비스를 통해
          <br />
          소중한 동물 친구에 대한 정보를 쉽게 얻어보세요👀
        </h1>
        <img src="https://i.postimg.cc/sgF1xJL6/IMG-0614.png" border="0" />
        <Search posts={posts} setPosts={setPosts} fetchData={fetchData} />
        <Write posts={posts} setPosts={setPosts} fetchData={fetchData} />
      </StDiv>
      <main>
        <PostList posts={posts} setPosts={setPosts} />
      </main>
    </>
  );
};

export default Home;

const StDiv = styled.div`
  margin-top: 30px;
  height: 490px;
  display: grid;
  grid-template-columns: 1fr 750px 490px 1fr;
  grid-template-rows: 250px 70px 54px 1fr;
  padding: 60px 0px 90px 0px;

  & h1 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    margin-left: 10px;
    line-height: 50px;
    font-weight: 700;
  }
  & img {
    grid-column: 3 / 4;
    grid-row: 1 / 5;
    height: 490px;
    z-index: -100;
    margin: 0 auto;
  }

  & .search {
    grid-column: 2 / 3;
  }

  & .tag-buttons {
    grid-column: 2 / 3;
    display: flex;
  }

  & .write-btn {
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
  }
`;
