import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { RiImage2Line } from 'react-icons/ri';
import { StButton } from '../detail/StyleButton';

const WritePost = ({ posts, setPosts, fetchData, closeModal }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postId, setPostId] = useState('');
  const userState = useSelector((state) => state.user);
  const userImage = userState.photoURL;
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setPostId(shortid.generate());
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
    console.log('이거 맞지 않나?', event.target.files?.[0].name);
    setChanged(true);
  };

  const addPost = async (event) => {
    event.preventDefault();

    const setNewPost = async (title, body, downloadURL, selectedFile) => {
      if (title && body) {
        const newPost = {
          title: title,
          body: body,
          postId: postId,
          userId: userState.uid,
          nickName: userState.displayName,
          imgURL: downloadURL ? downloadURL : null,
          imgName: selectedFile ? selectedFile.name : null,
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
    };

    if (selectedFile) {
      const imageRef = ref(storage, `${postId}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);

      setNewPost(title, body, downloadURL, selectedFile);
    } else {
      setNewPost(title, body, null, null);
    }
  };

  useEffect(() => {
    setCheckedTags([]);
  }, [posts]);
  const tags = useSelector((state) => state.tags);
  const [checkedTags, setCheckedTags] = useState([]);

  const checkedItemHandler = (checked, value) => {
    if (checked) {
      if (checkedTags.includes(value)) {
        return;
      } else {
        setCheckedTags([...checkedTags, value]);
      }
    } else {
      const removedTags = checkedTags.filter((tag) => tag !== value);
      setCheckedTags([...removedTags]);
    }
  };
  return (
    <>
      <StFormTitle>새 게시물 작성하기</StFormTitle>
      <hr />
      <StForm onSubmit={addPost}>
        <StImageWrapper>
          <label htmlFor="input_file">
            <RiImage2Line
              style={{ fontSize: '20px', width: '30px', height: '30px', fontWeight: 700, cursor: 'pointer' }}
            />
          </label>
          <input type="file" id="input_file" onChange={handleFileSelect} style={{ display: 'none' }} />
          <span style={{ lineHeight: '30px' }}>{changed ? selectedFile.name : '파일을 선택해주세요'}</span>
        </StImageWrapper>
        <StHr />
        <StInput
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력하세요"
        />
        <StHr />
        <StTextarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="내용을 입력하세요"
        />
        <StHr />
        <StHashtags>
          {tags.map((tag) => {
            return (
              <div key={tag}>
                <StHashtag
                  type="checkbox"
                  name="tag"
                  id={tag}
                  value={tag}
                  onChange={(e) => checkedItemHandler(e.target.checked, e.target.value)}
                />
                <StHashtagLabel htmlFor={tag} checkedTags={checkedTags}>
                  {tag}
                </StHashtagLabel>
              </div>
            );
          })}
        </StHashtags>
        <StFormButtons>
          <StButton action={'저장'}>저장</StButton>
          <StButton action={'닫기'} type="button" onClick={closeModal}>
            닫기
          </StButton>
        </StFormButtons>
      </StForm>
    </>
  );
};

export default WritePost;

const StFormTitle = styled.h3`
  margin: 0px;
  text-align: center;
`;

const StForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px 0px;
`;

const StInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 5px 15px;
  border-radius: 8px;
  border: none;
  outline: none;
`;

const StTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 5px 15px;
  border-radius: 8px;
  border: none;
  outline: none;
  height: 150px;
  resize: none;
`;

const StHr = styled.hr`
  width: 95%;
  border: 0;
  height: 1px;
  background-color: #d2d2d2;
  margin: 0;
`;

const StHashtags = styled.div`
  margin: 10px 0px 30px;
  display: flex;
  flex-direction: row;
  gap: 0 20px;
`;

const StFormButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const StHashtag = styled.input`
  appearance: none;
`;

const StHashtagLabel = styled.label`
  cursor: pointer;
  font-weight: 500;
  color: ${({ htmlFor, checkedTags }) => {
    return checkedTags.includes(htmlFor) ? '#fff' : '#777';
  }};
  background-color: ${({ htmlFor, checkedTags }) => {
    if (!checkedTags.includes(htmlFor)) {
      return '#ffffff';
    }
    if (checkedTags.includes(htmlFor)) {
      switch (htmlFor) {
        case '#강아지':
          return '#FFB6C1';
        case '#고양이':
          return '#87CEEB';
        case '#간식':
          return '#FFE0A3';
        case '#음식':
          return '#FFCC99';
        case '#병원':
          return '#AED6F1';
        default:
          return '#ffffff';
      }
    }
  }};
  padding: 5px;
  border-radius: 8px;
`;

const StImageWrapper = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  gap: 10px;
`;
