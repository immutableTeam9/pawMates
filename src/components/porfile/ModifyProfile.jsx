import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyProfile, onUserStateChange, storage } from '../../firebase';
import { setUser } from '../../redux/modules/user';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { modifyProfileModalInactive } from '../../redux/modules/modalState';
import { styled } from 'styled-components';

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
    <StModifyBox>
      <h3>프로필수정</h3>
      <form onSubmit={handleModifyProfile}>
        <div className="input-box">
          <label htmlFor="">닉네임: </label>
          <input
            type="text"
            value={newDispalyName}
            onChange={(e) => setNewDisplayName((prev) => (prev = e.target.value))}
          />
        </div>
        <div>
          <StProfileImg imgUrl={imgSrc} />
          <input type="file" onChange={handleImgPreviw} />
        </div>

        <div className="button-box">
          <button className="btn-cancel" type="button" onClick={() => dispatch(modifyProfileModalInactive())}>
            취소
          </button>
          <button className="btn-modify" type="submit">
            수정
          </button>
        </div>
      </form>
    </StModifyBox>
  );
}

const StModifyBox = styled.div`
  text-align: center;
`;

const StProfileImg = styled.div`
  width: 150px;
  height: 150px;
  margin: 1rem auto;
  border-radius: 50%;
  overflow: hidden;
  color: ${(props) => props.color};
  background: ${(props) => `center / cover url(${props.imgUrl}) no-repeat`};
`;
