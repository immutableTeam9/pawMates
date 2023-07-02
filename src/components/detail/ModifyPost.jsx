import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
// import { RiImage2Line } from 'react-icons/ri';
import { MdImageNotSupported } from 'react-icons/md';
import { MdImageSearch } from 'react-icons/md';
import { StButton } from './StyleButton';

const ModifyPost = ({ closeModal, post, setPosts, postId, imgName }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [changed, setChanged] = useState(false);

  console.log('imgName', imgName);

  // tags
  const tags = useSelector((state) => state.tags);
  const prevTags = post.tags.split(','); // ['#병원', '#강아지'] // 기존 저장된 tags
  const [pickedCheckedTags, setPickedCheckedTags] = useState(prevTags); // '수정'에 제출할 tag 형태
  let initialCheckedtags = tags.map((tag) => {
    if (prevTags.includes(tag)) {
      return { tag, isHere: true };
    } else {
      return { tag, isHere: false };
    }
  });
  const [checkedTags, setCheckedTags] = useState(initialCheckedtags); // 모든 태그가 이 형태로 저장 [{tag: '#병원', isHere:true}, {tag: '#고양이', isHere:false}, ・・・ ]

  const checkedItemHandler = (changedTag) => {
    const newCheckedTags = checkedTags.map((prevTag) => {
      if (prevTag.tag === changedTag) {
        return { ...prevTag, isHere: !prevTag.isHere };
      } else {
        return prevTag;
      }
    });
    setCheckedTags((prev) => newCheckedTags);
    console.log(' 바로 바뀌니? ', newCheckedTags);
    setPickedCheckedTags(
      newCheckedTags
        .filter((newCheckedTag) => {
          return newCheckedTag.isHere === true;
        })
        .map((filtered) => {
          return filtered.tag;
        })
    );
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
    setChanged(true);
  };
  const modifyUploadedImg = async (postRef) => {
    const imageRef = ref(storage, `${post.postId}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);

    setPosts((prev) => {
      return prev.map((element) => {
        if (element.id === post.id) {
          return {
            ...element,
            title,
            body,
            imgURL: downloadURL,
            imgName: selectedFile.name,
            tags: pickedCheckedTags.join()
          };
        } else {
          return element;
        }
      });
    });
    await updateDoc(postRef, {
      ...post,
      title,
      body,
      imgURL: downloadURL,
      imgName: selectedFile.name,
      tags: pickedCheckedTags.join()
    });
    closeModal();
    alert('수정되었습니다!');
  };

  const modifyPost = async (postRef) => {
    await updateDoc(postRef, { ...post, title, body, tags: pickedCheckedTags.join() });
    setPosts((prev) => {
      return prev.map((element) => {
        if (element.id === post.id) {
          return { ...element, title, body, tags: pickedCheckedTags.join() };
        } else {
          return element;
        }
      });
    });
    closeModal();
    alert('수정되었습니다!');
  };

  const updatePost = async (event) => {
    if (window.confirm('수정하시겠습니까?')) {
      event.preventDefault();
      const postRef = doc(db, 'posts', post.id);
      if (post.imgName === null) {
        if (selectedFile) {
          modifyUploadedImg(postRef);
        } else {
          modifyPost(postRef);
        }
      } else {
        if (selectedFile) {
          modifyUploadedImg(postRef);
        } else {
          modifyPost(postRef);
        }
      }
    } else return;
  };

  const deleteImg = async (event) => {
    event.preventDefault();
    const postRef = doc(db, 'posts', post.id);
    await updateDoc(postRef, { ...post, title: title, body: body, imgURL: null, imgName: null });

    setPosts((prev) => {
      return prev.map((element) => {
        if (element.id === post.id) {
          return { ...element, title: title, body: body, imgURL: null, imgName: null };
        } else {
          return element;
        }
      });
    });
    const imageRef = ref(storage, `${post.postId}/${post.imgName}`);
    await deleteObject(imageRef);
  };

  // form tag enter 불필요한 제출 방지
  const preventEnter = (e) => {
    if (e.code === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  //form tag textarea는 enter event 열어두기
  // const notreventEnter = (e) => {
  //   if (e.code === 'Enter'&& e.target.tagName !== 'TEXTAREA' ) {
  //     e.preventDefault();
  //   }
  // };

  return (
    <div>
      {console.log('pickedCheckedTags=>', pickedCheckedTags)}
      <StFormTitle>게시물 수정하기</StFormTitle>
      <hr />
      <StForm onSubmit={updatePost} onKeyDown={preventEnter}>
        <StImageWrapper>
          <ImageUpdating>
            <label htmlFor="input_file">
              <MdImageSearch
                style={{ fontSize: '20px', width: '30px', height: '30px', fontWeight: 700, cursor: 'pointer' }}
              />
            </label>
            <input type="file" id="input_file" onChange={handleFileSelect} style={{ display: 'none' }} />
            <span style={{ lineHeight: '30px' }}>{changed ? selectedFile.name : imgName}</span>
          </ImageUpdating>

          <button type="button" onClick={deleteImg} style={{ backgroundColor: '#fff', border: 'none' }}>
            <MdImageNotSupported
              style={{ fontSize: '18spx', width: '28px', height: '28px', fontWeight: 700, cursor: 'pointer' }}
            />
          </button>
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
          {checkedTags.map((checkedTag) => {
            return (
              <label key={checkedTag.tag}>
                <StHashtag
                  type="checkbox"
                  name="tag"
                  id={checkedTag.tag}
                  value={checkedTag.tag}
                  checked={checkedTag.isHere}
                  onChange={() => checkedItemHandler(checkedTag.tag)}
                />
                <StHashtagLabel htmlFor={checkedTag.tag} pickedCheckedTags={pickedCheckedTags}>
                  {checkedTag.tag}
                </StHashtagLabel>
              </label>
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
    </div>
  );
};

export default ModifyPost;

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
  color: ${({ htmlFor, pickedCheckedTags }) => {
    return pickedCheckedTags.includes(htmlFor) ? '#fff' : '#777';
  }};
  background-color: ${({ htmlFor, pickedCheckedTags }) => {
    if (!pickedCheckedTags.includes(htmlFor)) {
      return '#ffffff';
    }
    if (pickedCheckedTags.includes(htmlFor)) {
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
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageUpdating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;
