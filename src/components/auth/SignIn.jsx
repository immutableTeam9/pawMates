import { useState } from 'react';
import { firebaseSignIn } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signinModalInactive } from '../../redux/modules/modalState';
import { setUser } from '../../redux/modules/user';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;
    if (name === 'email') setEmail(value);
    if (name === 'pwd') setPwd(value);
  };
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    firebaseSignIn(email, pwd).then((userImpl) => {
      dispatch(setUser(userImpl.user));
      dispatch(signinModalInactive());
    });
  };
  return (
    <div className="App">
      <h3>로그인</h3>
      <form onSubmit={handleSignIn}>
        <div>
          <div className="input-box">
            <label>이메일 : </label>
            <input type="email" value={email} name="email" onChange={onChange}></input>
          </div>
          <div className="input-box">
            <label>비밀번호 : </label>
            <input type="password" value={pwd} name="pwd" onChange={onChange}></input>
          </div>
        </div>

        <div className="button-box">
          <button className="btn-cancel" type="button" onClick={() => dispatch(signinModalInactive())}>
            닫기
          </button>
          <button className="btn-success" type="submit">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
