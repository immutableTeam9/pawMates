import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';

const ModifyPost = ({ closeModal, post, setPosts }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
  };

  const updatePost = async (event) => {
    if (window.confirm('정말 수정하시겠습니다?')) {
      event.preventDefault();
      const postRef = doc(db, 'posts', post.id);
      if (post.img === null) {
        await updateDoc(postRef, { ...post, title: title, body: body });

        setPosts((prev) => {
          return prev.map((element) => {
            if (element.id === post.id) {
              return { ...element, title: title, body: body };
            } else {
              return element;
            }
          });
        });
        closeModal();
        alert('수정되었습니다!');
      } else {
        const deletedImgRef = ref(storage, `${post.postId}/${post.imgName}`);
        const imageRef = ref(storage, `${post.postId}/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        const downloadURL = await getDownloadURL(imageRef);

        setPosts((prev) => {
          return prev.map((element) => {
            if (element.id === post.id) {
              return { ...element, title: title, body: body, imgURL: downloadURL, imgName: selectedFile.name };
            } else {
              return element;
            }
          });
        });
        await updateDoc(postRef, {
          ...post,
          title: title,
          body: body,
          imgURL: downloadURL,
          imgName: selectedFile.name
        });
        await deleteObject(deletedImgRef);
        closeModal();
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
  };

  return (
    <div>
      <form onSubmit={updatePost}>
        <div>
          <label>제목</label>
          <input
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label>내용</label>
          <input
            defaultValue={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <div>
          이미지 파일 올리기
          <input type="file" onChange={handleFileSelect} />
        </div>
        <button onClick={deleteImg}>이미지 삭제하기</button>
        <button>저장</button>
        <button type="button" onClick={closeModal}>
          닫기
        </button>
      </form>
    </div>
  );
};

export default ModifyPost;
