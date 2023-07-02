import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import shortid from 'shortid';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StButton } from './StyleButton';
import { RiHeart3Line } from 'react-icons/ri';
// RiHeart3Line
// RiHeart3Fill

function DetailComments({ users }) {
  // identification
  // [ ] detail page에서 새로고침하면 userState => 빈값되어서 오류 뜸 (이 문제는 마지막에해도..될듯)
  // ?
  // [ ] user확인 id 뭘로 통일할지 결정해야함 (게시물&코멘트 -삭제, 수정 시 필요)
  const userState = useSelector((state) => state.user);
  const userNickName = userState.displayName;
  const userEmail = userState.email;
  const userId = userState.uid;
  const userImage = userState.photoURL;
  const [verifiedUser, setVerifiedUser] = useState(false);

  const param = useParams();

  // CommentListing
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'comments'));
      const querySnapShot = await getDocs(q);

      const initialComments = [];

      querySnapShot.forEach((doc) => {
        initialComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(initialComments);

      setIsLoading(false);
    };
    fetchData();
  }, [addComment]);
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  const filteredComments = comments.filter((comment) => {
    return comment.postDBId === params.id;
  });

  // form comment
  const postDBId = param.id;
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };
  const onSubmit = async (e) => {
    if (comment) {
      e.preventDefault();
      // [ ] 아래 commentWriter 관련 정보 셋중 하나 or 2개만 선택
      const newComment = {
        commentId: shortid.generate(),
        date: getToday(),
        userId,
        userEmail,
        userNickName,
        userImage,
        postDBId,
        commentBody: comment
      };
      const collectionRef = collection(db, 'comments');
      await addDoc(collectionRef, newComment);

      setComments((prev) => {
        return [...comments, newComment];
      });
      setComment('');
      setAddComment(!addComment);
    } else {
      e.preventDefault();
      alert('댓글을 입력해주세요');
    }
  };

  // delete comment
  const onDeleteCommentClick = async (id, commentUserId) => {
    // [ ] 댓글 작성자가 아니면 버튼 안보이게 했는데 아래 조건문도 필요하나?
    if (commentUserId !== userId) {
      return;
    }
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const commentRef = doc(db, 'comments', id);
      await deleteDoc(commentRef);

      setComments((prev) => {
        return prev.filter((element) => element.id !== id);
      });
    } else {
      return;
    }
  };

  const verifyUser = () => {
    if (!Boolean(Object.keys(userState).length)) {
      alert('로그인 후  댓글 작성이 가능합니다.');
      setVerifiedUser(true);
      return;
    }
  };
  return (
    <DetailCommentsWrapper>
      <CommentUl>
        {/* [x] 아래 user의 프로필사진 가져올 때 user확인 resource 변경됨 firestore -> auth */}
        {filteredComments.map((comment) => {
          return (
            <CommentLi key={comment.id}>
              <UserInfoArea>
                <UserImage key={'image' + comment.id} src={comment.userImage} alt="userProfileimage" />
              </UserInfoArea>
              <StCommentBody>
                <StUserLine>
                  <span style={{ fontWeight: '600' }}>{comment.userNickName}</span>
                  {userId === comment.userId && (
                    <StDeleteButton onClick={() => onDeleteCommentClick(comment.id, comment.userId)}>
                      삭제
                    </StDeleteButton>
                  )}
                </StUserLine>
                <p style={{ margin: '0' }}>{comment.commentBody}</p>
                <p style={{ fontSize: '12px' }}>{comment.date}</p>
              </StCommentBody>
            </CommentLi>
          );
        })}
      </CommentUl>
      <StLike>
        <RiHeart3Line style={{ fontSize: '25px' }} />
        <span>좋아요</span>
      </StLike>
      <StCommentForm onSubmit={onSubmit}>
        <StInput
          type="text"
          name="comment"
          placeholder="댓글 달기..."
          value={comment}
          onChange={onChange}
          disabled={verifiedUser}
          onFocus={verifyUser}
        />
        <StButton
          action={'저장'}
          style={{ boxSizing: 'border-box', height: '100%', borderRadius: '0 0 8px 0 / 0 0 8px 0', border: 'none' }}
        >
          게시
        </StButton>
      </StCommentForm>
    </DetailCommentsWrapper>
  );
}

export default DetailComments;

const DetailCommentsWrapper = styled.div`
  box-sizing: border-box;
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  /* @media screen and (max-width: 768px) {
    width: 100%;
  } */
`;

const CommentUl = styled.ul`
  box-sizing: border-box;
  padding: 0 20px;
  margin: 10px 0;
  height: 100%;
`;

const CommentLi = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
  list-style: none;
  /* border: 1px solid black; */
  display: flex;
`;
const UserInfoArea = styled.div`
  width: 30px;
  height: 35px;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

const StUserLine = styled.div`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StCommentBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-left: 8px;
`;

const StDeleteButton = styled.button`
  width: 55px;
  height: 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;

  &:hover {
    color: #fff;
    background-color: #e15757;
  }
`;

const StLike = styled.div`
  padding: 10px 20px;
  border-top: 1px solid #d2d2d2;
  border-bottom: 1px solid #d2d2d2;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StCommentForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  border-right: 1px solid #d2d2d2;
  outline: none;
  padding: 20px;
`;
