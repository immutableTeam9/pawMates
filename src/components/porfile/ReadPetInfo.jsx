import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPetData } from '../../redux/modules/petData';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { modifyPetInfoModalActive } from '../../redux/modules/modalState';
import { createPortal } from 'react-dom';
import Modal from '../common/Modal';
import ModifyPetInfo from './ModifyPetInfo';
import { styled } from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';

export default function ReadPetInfo() {
  const petData = useSelector((state) => state.petData);
  const userState = useSelector((state) => state.user);
  const petinfoModalState = useSelector((state) => state.modalState.modifyPetInfoModalState);
  const dispatch = useDispatch();

  const getPetInfo = async () => {
    const postsRef = collection(db, 'petInfo');
    const q = query(postsRef, where('ownerId', '==', userState.uid));
    const querySnapshot = await getDocs(q);
    let petInfo = {};
    querySnapshot.forEach((doc) => {
      petInfo = { ...doc.data(), docId: doc.id };
    });
    dispatch(setPetData(petInfo));
  };

  useEffect(() => {
    getPetInfo();
  }, []);

  const { name, type, age, gender } = petData;

  return (
    <StPetInfoBox>
      <div className="inner">
        <h3>
          반려동물 정보{' '}
          <button
            className="btn-modify-profile"
            title="반려 정보 수정하기"
            onClick={() => dispatch(modifyPetInfoModalActive())}
          >
            <FaPencilAlt />
          </button>
        </h3>

        {petinfoModalState &&
          createPortal(
            <Modal>
              <ModifyPetInfo />
            </Modal>,
            document.body
          )}

        <StPetText>
          {!name && !type && !age && !gender && <p>등록된 반려동물 정보가 없습니다.</p>}
          {name && (
            <p>
              이름: <span>{name}</span>
            </p>
          )}
          {type && (
            <p>
              종류: <span>{type === 'dog' ? '강아지' : type === 'cat' ? '고양이' : '기타'}</span>
            </p>
          )}
          {age && (
            <p>
              나이: <span>{age}살</span>
            </p>
          )}
          {gender && (
            <p>
              성별: <span>{gender === 'male' ? '남자아이' : '여자아이'}</span>
            </p>
          )}
        </StPetText>
      </div>
    </StPetInfoBox>
  );
}

const StPetInfoBox = styled.div`
  text-align: center;
  background-color: #fffbf2;
  border-top: 3px dotted #ffb200;
  border-bottom: 3px dotted #ffb200;

  & .inner {
    max-width: 1200px;
    min-width: 992px;
    margin: 0 auto;
    padding: 30px 16px;
  }

  & h3 {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    font-weight: 700;
  }

  & .btn-modify-profile {
    background-color: transparent;
    border: 0;
    transform: translateY(2px);
    cursor: pointer;

    & svg {
      font-size: 1.1rem;
      color: #ffb200;
      transition: 0.5s;
    }

    &:hover svg {
      transform: scale(1.2);
    }
  }
`;

const StPetText = styled.div`
  & p {
    color: #777;
  }
  & p > span {
    color: #222;
    font-weight: 500;
  }
`;
