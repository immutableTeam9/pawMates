import React, { useEffect, useState } from 'react';
import Search from '../components/home/Search';
import PostList from '../components/home/PostList';
import Write from '../components/home/Write';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import Header from '../components/Header';

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
    <div>
      <Header />
      <header>
        <div>
          <h1>Home</h1>
          <Search posts={posts} setPosts={setPosts} fetchData={fetchData}></Search>
        </div>
      </header>
      <main>
        <Write posts={posts} setPosts={setPosts} fetchData={fetchData}></Write>
        <PostList posts={posts} setPosts={setPosts}></PostList>
      </main>
      <footer>푸터푸터</footer>
    </div>
  );
};

export default Home;
