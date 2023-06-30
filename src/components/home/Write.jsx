import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import shortid from 'shortid';
import { db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';

const Write = ({ posts, setPosts, fetchData }) => {
  // identification
  const userState = useSelector((state) => state.user);
  const userImage = userState.photoURL;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    setPostId(shortid.generate());
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
  };

  const addPost = async (event) => {
    event.preventDefault();
    if (userState !== null) {
      if (selectedFile) {
        const imageRef = ref(storage, `${postId}/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);

        const downloadURL = await getDownloadURL(imageRef);

        if (title && body) {
          const newPost = {
            title: title,
            body: body,
            postId: postId,
            userId: userState.uid,
            nickName: userState.displayName,
            imgURL: downloadURL,
            imgName: selectedFile.name,
            date: new Date(),
            tags: checkedTags.join(),
            userImage
          };
          setPosts((prev) => {
            return [...posts, newPost];
          });

          const collectionRef = collection(db, 'posts');
          await addDoc(collectionRef, newPost);
          fetchData();
          setSelectedFile(null);
          setTitle('');
          setBody('');
          closeModal();
          alert('저장되었습니다!');
        } else {
          alert('제목과 내용을 입력해주세요!');
        }
      } else {
        if (title && body) {
          const newPost = {
            title: title,
            body: body,
            postId: postId,
            userId: userState.uid,
            nickName: userState.displayName,
            imgURL: null,
            imgName: null,
            date: new Date(),
            tags: checkedTags.join(),
            userImage
          };
          setPosts((prev) => {
            return [...posts, newPost];
          });

          const collectionRef = collection(db, 'posts');
          await addDoc(collectionRef, newPost);
          fetchData();
          setTitle('');
          setBody('');
          closeModal();
          alert('저장되었습니다!');
        } else {
          alert('제목과 내용을 입력해주세요!');
        }
      }
    } else {
      // [ ] ???? 아래 이 한 줄 뭐지
      alert('로그인이 되어 있지 않습니다!');
      if (title && body) {
        const newPost = {
          title: title,
          body: body,
          postId: postId,
          userId: 'userId',

          // CHECKLIST 수정한 부분 : nickName 추가 (이유 : 댓글에서 사용)
          nickName: '젤리곰',
          imgURL: null,
          imgName: null,
          date: new Date(),
          tags: checkedTags.join()
        };
        setPosts((prev) => {
          return [...posts, newPost];
        });

        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, newPost);
        fetchData();
        setTitle('');
        setBody('');
        closeModal();
        alert('저장되었습니다!');
      } else {
        alert('제목과 내용을 입력해주세요!');
      }
    }
  };

  useEffect(() => {
    setCheckedTags([]);
  }, [posts]);
  const tags = useSelector((state) => state.tags);
  const [checkedTags, setCheckedTags] = useState([]);
  // const checkedTags = [];

  const checkedItemHandler = (checked, value) => {
    if (checked) {
      if (checkedTags.includes(value)) {
        return;
      } else {
        // checkedTags.push(value);
        setCheckedTags([...checkedTags, value]);
      }
    } else {
      const removedTags = checkedTags.filter((tag) => tag !== value);
      // checkedTags = [...removedTags];
      setCheckedTags([...removedTags]);
    }
  };
  return (
    <div>
      <button onClick={openModal}>글 작성하기</button>
      {isOpen && (
        <StModalBox>
          <StModalContents>
            <form onSubmit={addPost}>
              <div>
                <label>제목</label>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>내용</label>
                <input
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </div>
              <div>
                이미지 파일 올리기
                <input type="file" onChange={handleFileSelect} />
              </div>
              <div>
                <p>태그 선택하기</p>
                {tags.map((tag) => {
                  return (
                    <label key={tag}>
                      <input
                        type="checkbox"
                        name="tag"
                        value={tag}
                        onChange={(e) => checkedItemHandler(e.target.checked, e.target.value)}
                      />
                      <span>{tag}</span>
                    </label>
                  );
                })}
              </div>
              <button>저장</button>
              <button type="button" onClick={closeModal}>
                닫기
              </button>
            </form>
          </StModalContents>
        </StModalBox>
      )}
    </div>
  );
};

export default Write;

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
