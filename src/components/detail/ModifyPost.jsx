import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useSelector } from 'react-redux';

const ModifyPost = ({ closeModal, post, setPosts, postId, imgName }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

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
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <div>
      <form onSubmit={updatePost} onKeyDown={preventEnter}>
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
        <button type="button" onClick={deleteImg}>
          이미지 삭제하기
        </button>
        <div>
          <p>태그 선택하기</p>
          {checkedTags.map((checkedTag) => {
            return (
              <label key={checkedTag.tag}>
                <input
                  type="checkbox"
                  name="tag"
                  value={checkedTag.tag}
                  checked={checkedTag.isHere}
                  onChange={() => checkedItemHandler(checkedTag.tag)}
                />
                <span>{checkedTag.tag}</span>
              </label>
            );
          })}
        </div>
        <button>저장</button>
        <button type="button" onClick={closeModal}>
          닫기
        </button>
      </form>
    </div>
  );
};

export default ModifyPost;
