import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useSelector } from 'react-redux';

const ModifyPost = ({ closeModal, post, setPosts, postId, imgName }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  // tag 체크박스 checkedDefault 해줘야하고, checkedDefault되어있는 상황에서 변경시켜줘야하니까..
  // checkedTags에 store에서 가져온 tag랑 todo에 있는 tag를 이용해서 {tag, isHere(true, false)} 객체로 관리 ..하자 그러면 => checked={true, false}로 구분할 수 있..을거야

  // tags
  const tags = useSelector((state) => state.tags);
  const prevTags = post.tags.split(','); // ['#병원', '#강아지']
  const [pickedCheckedTags, setPickedCheckedTags] = useState(prevTags);
  let initialCheckedtags = tags.map((tag) => {
    if (prevTags.includes(tag)) {
      return { tag, isHere: true };
    } else {
      return { tag, isHere: false };
    }
  });
  console.log('initialCheckedtags', initialCheckedtags);
  const [checkedTags, setCheckedTags] = useState(initialCheckedtags);

  // [ ] 질문 ?? => setCheckedTags()는 왜... useEffect에 넣은 거징
  // useEffect(() => {
  //   setCheckedTags([]);
  // }, []);

  // [ ] 너무 헷갈려..ㅋㅋㅋ
  // (checkedTags(모든 tags와 true, false여부가 있음)-->) pickedCheckedTags에 보내줄 최종 태그 배열을 담아야해.
  // checkedTags store에서 전체 태그, todos에서 true,false가져온걸로 조합해 만들기
  // checked가 onChange 될 때마다 checkedTags바뀌고!!, pickedCheckedTags도 바뀌죠.
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
    // console.log(pickedCheckedTags);
  };
  // -------------------------수정하기 버튼 시작---------------------------
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
  };
  console.log('pickedCheckedTags 제발..', pickedCheckedTags);
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
  //---------------------------------수정하기 버튼 끝----------------------------------

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
