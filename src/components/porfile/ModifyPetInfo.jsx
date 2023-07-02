import React, { useState } from 'react';
import { modifyPetInfoModalInactive } from '../../redux/modules/modalState';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { setPetData } from '../../redux/modules/petData';
import { styled } from 'styled-components';

export default function ModifyPetInfo() {
  const petData = useSelector((state) => state.petData);
  const dispatch = useDispatch();
  const [petInfo, setPetInfo] = useState({ ...petData });

  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;

    if (name === 'petType') setPetInfo((prev) => ({ ...prev, type: value }));
    if (name === 'petName') setPetInfo((prev) => ({ ...prev, name: value }));
    if (name === 'petAge') setPetInfo((prev) => ({ ...prev, age: value }));
    if (name === 'petGender') setPetInfo((prev) => ({ ...prev, gender: value }));
  };

  const handleChangePetInfo = async (e) => {
    e.preventDefault();
    const petRef = doc(db, 'petInfo', petInfo.docId);
    await updateDoc(petRef, { ...petInfo }).then(() => {
      dispatch(setPetData(petInfo));
    });

    dispatch(modifyPetInfoModalInactive());
  };

  return (
    <div>
      <form onSubmit={handleChangePetInfo}>
        <h3>반려동물 정보</h3>
        <div className="input-box">
          <label>종류 : </label>
          <select name="petType" value={petInfo.type} onChange={onChange}>
            <option value="">선택해주세요</option>
            <option value="dog">강아지</option>
            <option value="cat">고양이</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div className="input-box">
          <label>이름 : </label>
          <input type="text" value={petInfo.name} name="petName" onChange={onChange}></input>
        </div>
        <div className="input-box">
          <label>나이 : </label>
          <input type="text" value={petInfo.age} name="petAge" onChange={onChange}></input>
        </div>
        <div className="input-box">
          <label>성별 : </label>
          <select name="petGender" value={petInfo.gender} onChange={onChange}>
            <option value="">선택해주세요</option>
            <option value="female">여자아이</option>
            <option value="male">남자아이</option>
          </select>
        </div>
        <div className="button-box">
          <button type="button" className="btn-cancel" onClick={() => dispatch(modifyPetInfoModalInactive())}>
            취소
          </button>
          <button type="submit" className="btn-modify">
            수정
          </button>
        </div>
      </form>
    </div>
  );
}
