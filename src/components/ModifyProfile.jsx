import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyProfile, onUserStateChange, storage } from '../firebase';
import { setUser } from '../redux/modules/user';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { modifyProfileModalInactive } from '../redux/modules/modalState';

export default function ModifyProfile() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { displayName, photoURL, uid } = userState;

  const [newDispalyName, setNewDisplayName] = useState(displayName);

  const [selectedFile, setSelectedFile] = useState(null);

  const [imgSrc, setImgSrc] = useState(photoURL);
  const handleImgPreviw = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      setSelectedFile(file);
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  const handleModifyProfile = async (e) => {
    e.preventDefault();
    let newPhotoURL;
    if (!newDispalyName.length) {
      alert('닉네임을 입력해주세요');
      return false;
    } else {
      if (!!selectedFile) {
        const imgRef = ref(storage, `${uid}/profile/img/${selectedFile?.name}`);
        await uploadBytes(imgRef, selectedFile);
        newPhotoURL = await getDownloadURL(imgRef);
      }

      modifyProfile(newDispalyName, newPhotoURL || photoURL).then(() => {
        onUserStateChange((user) => {
          dispatch(setUser(user));
        });
      });

      dispatch(modifyProfileModalInactive());
    }
  };
  return (
    <div>
      <h2>프로필수정</h2>

      <form onSubmit={handleModifyProfile}>
        <div>
          <label htmlFor="">닉네임</label>
          <input
            type="text"
            value={newDispalyName}
            onChange={(e) => setNewDisplayName((prev) => (prev = e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="">프로필 사진</label>
          <input type="file" onChange={handleImgPreviw} />
          <div
            style={{
              width: 130,
              height: 130,
              border: '1px solid black',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'black'
            }}
          >
            <img style={{ width: '100%' }} src={imgSrc} alt={`${displayName} 프로필 사진`} />
          </div>
        </div>

        <button type="button" onClick={() => dispatch(modifyProfileModalInactive())}>
          취소
        </button>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
