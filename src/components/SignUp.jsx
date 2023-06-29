import { useEffect, useRef, useState } from 'react';
import { firebaseSignUp, onUserStateChange } from '../firebase';
import { useDispatch } from 'react-redux';
import { signupModalInactive } from '../redux/modules/modalState';
import { setUser } from '../redux/modules/user';
import { initialSwitchOff } from '../redux/modules/initialState';

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    email: '',
    pwd: '',
    nickName: ''
  });
  const [petInfo, setPetInfo] = useState({
    ownerId: '',
    type: '',
    name: '',
    age: '',
    gender: ''
  });
  const { email, pwd, nickName } = newUser;
  const nickNameRef = useRef(null);
  const emailRef = useRef(null);
  const pwdRef = useRef(null);

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
      await firebaseSignUp(email, pwd, nickName, petInfo) //
        .then(dispatch(signupModalInactive()));

      onUserStateChange((user) => {
        dispatch(setUser(user));
      });
    }
  };

  return (
    <div className="App">
      <h2>회원가입 페이지</h2>
      <form onSubmit={signUp}>
        <div>
          <div>
            <span>*</span>
            <label>닉네임 : </label>
            <input type="text" value={nickName} name="nickName" onChange={onChange} ref={nickNameRef}></input>
          </div>
          <div>
            <span>*</span>
            <label>이메일 : </label>
            <input type="email" value={email} name="email" onChange={onChange} ref={emailRef}></input>
          </div>
          <div>
            <span>*</span>
            <label>비밀번호 : </label>
            <input type="password" value={pwd} name="pwd" onChange={onChange} ref={pwdRef}></input>
          </div>
        </div>
        <div>
          <p>반려동물 정보</p>
          <div>
            <label>종류 : </label>
            <select name="petType" onChange={onChange}>
              <option value="">선택해주세요</option>
              <option value="dog">강아지</option>
              <option value="cat">고양이</option>
              <option value="etc">기타</option>
            </select>
          </div>
          <div>
            <label>이름 : </label>
            <input type="text" value={petInfo.name} name="petName" onChange={onChange}></input>
          </div>
          <div>
            <label>나이 : </label>
            <input type="text" value={petInfo.age} name="petAge" onChange={onChange}></input>
          </div>
          <div>
            <label>성별 : </label>
            <select name="petGender" onChange={onChange}>
              <option value="">선택해주세요</option>
              <option value="female">여자아이</option>
              <option value="male">남자아이</option>
            </select>
          </div>
        </div>
        <button>회원가입</button>
        <button type="button" onClick={() => dispatch(signupModalInactive())}>
          닫기
        </button>
      </form>
    </div>
  );
}
