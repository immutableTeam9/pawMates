import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';

const WritePost = ({ posts, setPosts, fetchData, closeModal }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postId, setPostId] = useState('');
  const userState = useSelector((state) => state.user);
  const userImage = userState.photoURL;

  useEffect(() => {
    setPostId(shortid.generate());
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
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
    </>
  );
};

export default WritePost;
