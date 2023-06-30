import React, { useEffect, useState } from 'react';
import ModifyPost from '../home/ModifyPost';
import { styled } from 'styled-components';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';

function DetailPost() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // controll state feature
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // getData from firebase
  useEffect(() => {
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
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  console.log(posts);

  const post = posts.filter((post) => {
    return post.id === params.id;
  })[0];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니다?')) {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);

      // [x] detail에서도 setPosts 없어도 home에서 사라지기에 없앴음
      // setPosts((prev) => {
      //   return prev.filter((element) => element.id !== post.id);
      // });
      alert('삭제 되었습니다.');
      navigate('/');
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
        {/* [ ] 이거는 post에 담긴 postWriterImage 정보 가져와서 넣기 */}
        {/* <UserImage src={writerImage} alt="" /> */}
        &nbsp;<span>{post.nickName}</span>
      </UserInfoArea>
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>hashTags</p>
      </div>

      {/* [ ] 메인에서 수정, 삭제 가져오기 */}
      <button onClick={openModal}>수정</button>
      {isOpen && (
        <StModalBox>
          <StModalContents>
            <ModifyPost closeModal={closeModal} post={post} setPosts={setPosts}></ModifyPost>
          </StModalContents>
        </StModalBox>
      )}
      <button onClick={deletePost}>삭제</button>
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

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 50%;
  height: 50%;
  border-radius: 12px;
`;
