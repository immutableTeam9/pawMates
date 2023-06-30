import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ModifyPost from './ModifyPost';
import Modal from '../Modal';

function DetailPost() {
  // controll state & sth
  const userState = useSelector((state) => state.user);
  const userId = userState.uid;
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  // getData from firebase
  const fetchData = async () => {
    const qPosts = query(collection(db, 'posts'));

    const querySnapshotPosts = await getDocs(qPosts);

    const initialPosts = [];

    querySnapshotPosts.forEach((doc) => {
      initialPosts.push({ id: doc.id, ...doc.data() });
    });
    setPosts(initialPosts);

    setIsLoading(false);
  };
  // get data 'posts' from firebase
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  // filter data 'post' for detail page
  const post = posts.filter((post) => {
    return post.id === params.id;
  })[0];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // delete data from firebas
  const deletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니다?')) {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);

      alert('삭제 되었습니다.');
      navigate(-1);
    } else return;
  };

  return (
    <DetailPostWrapper>
      <div>
        <img
          src={post.imgURL}
          style={{
            width: '20%',
            height: '30%'
          }}
        />
      </div>
      <UserInfoArea>
        <UserImage src={post.userImage} alt="" />
        &nbsp;<span>{post.nickName}</span>
      </UserInfoArea>
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>{post.tags}</p>
      </div>
      {userId === post.userId && <button onClick={openModal}>수정</button>}
      {isOpen && (
        <Modal>
          <ModifyPost closeModal={closeModal} post={post} setPosts={setPosts}></ModifyPost>
        </Modal>
      )}
      {userId === post.userId && <button onClick={deletePost}>삭제</button>}
    </DetailPostWrapper>
  );
}

export default DetailPost;

const DetailPostWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const UserInfoArea = styled.div`
  border: 1px solid black;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;
