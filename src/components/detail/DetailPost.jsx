import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ModifyPost from './ModifyPost';
import Modal from '../common/Modal';
import { StButton } from './StyleButton';
import { RiMoreFill } from 'react-icons/ri';

function DetailPost() {
  // controll state & sth
  const userState = useSelector((state) => state.user);
  const userId = userState.uid;
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPostUserBtn, setIsOpenPostUserBtn] = useState(false);
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
    setIsOpenPostUserBtn(!isOpenPostUserBtn);
    setIsOpen(false);
  };

  // toggle user button
  const toggleUserBtn = () => {
    setIsOpenPostUserBtn(!isOpenPostUserBtn);
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
      <StMostContent>
        <UserInfoArea>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserImage src={post.userImage} alt={`${post.nickName}`} />
            &nbsp;<span style={{ fontWeight: '600' }}>{post.nickName}</span>
          </div>
          {userId === post.userId && (
            <RiMoreFill style={{ fontSize: '25px', position: 'relative', cursor: 'pointer' }} onClick={toggleUserBtn} />
          )}
          {isOpenPostUserBtn && (
            <StPostButtons>
              {userId === post.userId && (
                <StButton action={'수정'} onClick={openModal}>
                  수정
                </StButton>
              )}
              {isOpen && (
                <Modal>
                  <ModifyPost
                    closeModal={closeModal}
                    post={post}
                    setPosts={setPosts}
                    imgName={post.imgName}
                  ></ModifyPost>
                </Modal>
              )}
              {userId === post.userId && (
                <StButton action={'삭제'} onClick={deletePost}>
                  삭제
                </StButton>
              )}
            </StPostButtons>
          )}
        </UserInfoArea>
        <StScrollFam>
          {post.imgURL && (
            <StPostImgArea>
              {' '}
              <StPostImg src={post.imgURL} alt={`${post.title} 이미지`} />
            </StPostImgArea>
          )}
          <StTextArea>
            <h3 style={{ fontWeight: '500' }}>{post.title}</h3>
            <p style={{ height: '100%' }}>{post.body}</p>
          </StTextArea>
        </StScrollFam>
      </StMostContent>

      <StTagArea>{post.tags.replaceAll(',', ' ')}</StTagArea>
    </DetailPostWrapper>
  );
}

export default DetailPost;

const DetailPostWrapper = styled.div`
  box-sizing: border-box;
  width: 50%;
  height: 600px;
  border-right: 1px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
  /* @media screen and (max-width: 768px) {
    width: 100%;
  } */
`;

const StMostContent = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
`;

const UserInfoArea = styled.div`
  border-bottom: 1px solid #d2d2d2;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

const StTextArea = styled.div`
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const StPostButtons = styled.div`
  background-color: #fff;
  padding: 10px;
  border: 1px solid #777;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 40px;
  right: 10px;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

const StPostImgArea = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StPostImg = styled.img`
  max-width: 200px;
`;

// [ ] 이 태그 부분 맨 밑으로 내리고 싶은데 안되요.... css.. 흡
const StTagArea = styled.p`
  padding: 10px;
  margin: 0;
  margin-top: 20px;
  justify-self: flex-end;
`;
const StScrollFam = styled.div`
  height: 475px;
  overflow: auto;
`;
