import React from 'react';
import styled from 'styled-components';

function DetailPost() {
  return (
    <DetailPostWrapper>
      <div>
        <img src="" alt="detailPostImg" />
      </div>
      <UserInfoArea>
        <img src="" alt="userProfileimage" />
        &nbsp;<span>userId</span>
      </UserInfoArea>
      <div>
        <h3>title</h3>
        <p>postBody</p>
        <p>tags</p>
      </div>
    </DetailPostWrapper>
  );
}

export default DetailPost;

const DetailPostWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const UserInfoArea = styled.div`
  border: 1px solid black;
`;
