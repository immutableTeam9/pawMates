import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const initialPosts = [];

const fetchData = async () => {
  const q = query(collection(db, 'posts'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    initialPosts.push({ id: doc.id, ...doc.data() });
  });
};
fetchData();

const posts = (state = initialPosts, action) => {
  switch (action.type) {
    case 'SEARCH_POST':
      const initialPosts = [];
      fetchData();
      return [...initialPosts];
    default:
      return state;
  }
};

export default posts;
