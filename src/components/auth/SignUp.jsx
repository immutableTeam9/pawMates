import { useRef, useState } from 'react';
import { firebaseSignUp, onUserStateChange } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signupModalInactive } from '../../redux/modules/modalState';
import { setUser } from '../../redux/modules/user';
import { styled } from 'styled-components';

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    email: '',
    pwd: '',
    nickName: '',
    userImage: 'https://cdn-icons-png.flaticon.com/512/552/552721.png'
  });
  const [petInfo, setPetInfo] = useState({
    ownerId: '',
    type: '',
    name: '',
    age: '',
    gender: ''
  });
  const { email, pwd, nickName, userImage } = newUser;
  const nickNameRef = useRef(null);
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  // const userRef = useRef(null);

  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;
    if (name === 'email') setNewUser((prev) => ({ ...prev, email: value }));
    if (name === 'pwd') setNewUser((prev) => ({ ...prev, pwd: value }));
    if (name === 'nickName') setNewUser((prev) => ({ ...prev, nickName: value }));
    if (name === 'petType') setPetInfo((prev) => ({ ...prev, type: value }));
    if (name === 'petName') setPetInfo((prev) => ({ ...prev, name: value }));
    if (name === 'petAge') setPetInfo((prev) => ({ ...prev, age: value }));
    if (name === 'petGender') setPetInfo((prev) => ({ ...prev, gender: value }));
  };

  const dispatch = useDispatch();

  const validationCheck = () => {
    const isValidEmail = email.includes('@') && email.includes('.');
    const specialLetter = pwd.search(/[`~!@@#$%^&*|\\\\'\";:\/?]/gi);
    const isValidPwd = pwd.length >= 8 && specialLetter >= 1;

    if (!nickName) {
      alert('닉네임을 입력해주세요');
      nickNameRef.current.focus();
      return false;
    } else if (!email) {
      alert('이메일을 입력해주세요');
      emailRef.current.focus();
      return false;
    } else if (!isValidEmail) {
      alert('올바른 이메일 형식이 아닙니다');
      emailRef.current.focus();
      return false;
    } else if (!pwd) {
      alert('비밀번호를 입력해주세요');
      pwdRef.current.focus();
      return false;
    } else if (!isValidPwd) {
      alert('비밀번호는 8자 이상, 특수문자 1개 이상 포함해주세요');
      pwdRef.current.focus();
      return false;
    }
    return true;
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      await firebaseSignUp(email, pwd, nickName, userImage, petInfo) //
        .then(() => {
          onUserStateChange((user) => {
            dispatch(setUser(user));
            dispatch(signupModalInactive());
          });
        });
    }
  };

  return (
    <div className="App">
      <h3>회원가입 페이지</h3>
      <form onSubmit={signUp}>
        <div>
          <div className="input-box">
            <span>*</span>
            <label>닉네임 : </label>
            <input type="text" value={nickName} name="nickName" onChange={onChange} ref={nickNameRef}></input>
          </div>
          <div className="input-box">
            <span>*</span>
            <label>이메일 : </label>
            <input type="email" value={email} name="email" onChange={onChange} ref={emailRef}></input>
          </div>
          <div className="input-box">
            <span>*</span>
            <label>비밀번호 : </label>
            <input type="password" value={pwd} name="pwd" onChange={onChange} ref={pwdRef}></input>
          </div>
        </div>
        <StPetInfoBox>
          <h4>반려동물 정보</h4>
          <div className="input-box">
            <label>종류 : </label>
            <select name="petType" onChange={onChange}>
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
            <select name="petGender" onChange={onChange}>
              <option value="">선택해주세요</option>
              <option value="female">여자아이</option>
              <option value="male">남자아이</option>
            </select>
          </div>
        </StPetInfoBox>
        <div className="button-box">
          <button className="btn-cancel" type="button" onClick={() => dispatch(signupModalInactive())}>
            닫기
          </button>
          <button className="btn-success">회원가입</button>
        </div>
      </form>
    </div>
  );
}

const StPetInfoBox = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  & h4 {
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }
`;
