import React, { useEffect, useState } from 'react';
import Search from '../components/home/Search';
import PostList from '../components/home/PostList';
import Write from '../components/home/Write';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

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
      <div>
        <h1>Home</h1>
        <Search posts={posts} setPosts={setPosts} fetchData={fetchData} />
      </div>
      <main>
        <Write posts={posts} setPosts={setPosts} fetchData={fetchData} />
        <PostList posts={posts} setPosts={setPosts} />
      </main>
    </>
  );
};

export default Home;
