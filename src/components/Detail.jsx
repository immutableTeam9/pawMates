import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import DetailPost from './detail/DetailPost';
import DetailComments from './detail/DetailComments';

function Detail() {
  // controll state feature
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // getData from firebase
  useEffect(() => {
    const fetchData = async () => {
      const qUsers = query(collection(db, 'users'));
      const qPosts = query(collection(db, 'posts'));

      const querySnapshotUsers = await getDocs(qUsers);
      const querySnapshotPosts = await getDocs(qPosts);

      const initialUsers = [];
      const initialPosts = [];

      querySnapshotUsers.forEach((doc) => {
        initialUsers.push({ id: doc.id, ...doc.data() });
      });
      querySnapshotPosts.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });
      setUsers(initialUsers);
      setPosts(initialPosts);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  console.log(posts);
  const post = posts.filter((post) => {
    return post.postId === '1';
  })[0];
  return (
    <div>
      <DetailPost users={users} post={post} />
      <DetailComments users={users} post={post} />
    </div>
  );
}
export default Detail;
