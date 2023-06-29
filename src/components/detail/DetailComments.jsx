import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import shortid from 'shortid';

function DetailComments({ users, post }) {
  // CommentListing
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState(true);

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
  console.log('comments', comments);
  const filteredComments = comments.filter((comment) => {
    return comment.postId === '1';
  });

  // form comment
  const postId = post.postId;
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      commentId: shortid.generate(),
      date: String(new Date()),
      userId: 'olxloha@gmail.com',
      nickName: 'silverLee',
      postId,
      commentBody: comment
    };
    const collectionRef = collection(db, 'comments');
    await addDoc(collectionRef, newComment);

    setComments((prev) => {
      return [...comments, newComment];
    });
    setComment('');
    setAddComment(!addComment);
  };

  // delete comment
  // [ ] DELETE BUTTON 해야함
  const onDeleteCommentClick = async (id) => {
    // console.log('is this work?', id);
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
                <p>날짜</p>
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
