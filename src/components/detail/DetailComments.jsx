import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import shortid from 'shortid';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';

function DetailComments({ users, post }) {
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
      console.log('한번 더 실행!');
    };
    fetchData();
    console.log('이건됨');
  }, [addComment]);
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  console.log('comments', comments);
  const filteredComments = comments.filter((comment) => {
    return comment.postDBId === params.id;
  });

  // form comment
  const postDBId = post.id;
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const getToday = () => {
    const date = new Date();
    console.log(date);
    console.log(date.getFullYear());
    console.log(date.getMonth());
    console.log(date.getDate());
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      commentId: shortid.generate(),
      date: getToday(),
      userId: 'userId',
      nickName: '젤리곰',
      postDBId,
      commentBody: comment
    };
    const collectionRef = collection(db, 'comments');
    await addDoc(collectionRef, newComment);

    setComments((prev) => {
      return [...comments, newComment];
    });
    setComment('');
    // NOTE
    setAddComment(!addComment);
  };

  // delete comment
  const onDeleteCommentClick = async (id) => {
    const commentRef = doc(db, 'comments', id);
    await deleteDoc(commentRef);

    setComments((prev) => {
      return prev.filter((element) => element.id !== id);
    });
  };
  return (
    <DetailCommentsWrapper>
      <div>comments list</div>
      <CommentUl>
        {filteredComments.map((comment) => {
          const commentWriter = users.filter((user) => {
            return user.userId === comment.userId;
          })[0];
          let commentWriterImage = commentWriter.userImage;
          commentWriterImage === '' && (commentWriterImage = 'https://cdn-icons-png.flaticon.com/512/552/552721.png');
          console.log(typeof commentWriterImage);
          return (
            <CommentLi>
              <UserInfoArea>
                <UserImage key={'image'} src={commentWriterImage} alt="userProfileimage" />
              </UserInfoArea>
              <div>
                <p>{comment.nickName}</p>
                <p>{comment.date}</p>
                <p>{comment.commentBody}</p>
                <button onClick={() => onDeleteCommentClick(comment.id)}>삭제</button>
              </div>
            </CommentLi>
          );
        })}
      </CommentUl>
      <div>❤︎ 좋아요</div>
      <form onSubmit={onSubmit}>
        <input type="text" name="comment" placeholder="댓글 달기..." value={comment} onChange={onChange} />
        <button>게시</button>
      </form>
    </DetailCommentsWrapper>
  );
}

export default DetailComments;

const DetailCommentsWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CommentUl = styled.ul`
  padding: 0;
  margin: 10px 0;
`;

const CommentLi = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid black;
  display: flex;
`;
const UserInfoArea = styled.div`
  border: 1px solid black;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;
