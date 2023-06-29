import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import DetailPost from '../components/detail/DetailPost';
import DetailComments from '../components/detail/DetailComments';
import { useNavigate, useParams } from 'react-router-dom';

function Detail() {
  // controll state feature
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

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
    return post.id === params.id;
  })[0];
  return (
    <div>
      <button onClick={() => navigate('/')}>HOME으로 이동</button>
      <DetailPost users={users} post={post} />
      <DetailComments users={users} post={post} />
    </div>
  );
}
export default Detail;
