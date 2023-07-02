import React from 'react';
import { css, styled } from 'styled-components';

export const StButton = styled.button`
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 55px;
          height: 24px;
        `;
      default:
        return css`
          width: 70px;
          height: 32px;
        `;
    }
  }}
  background-color: white;
  border-style: solid;
  border-color: ${({ action }) => {
    switch (action) {
      case '수정':
        return '#ffb200';
      case '삭제':
        return '#e15757';
      case '저장':
        return '#38a169';
      case '닫기':
        return '#777';
      default:
        return '#777';
    }
  }};
  /* ${({ action }) => {
    switch (action) {
      case '수정':
        return css`
          border: 3px solid '#ffb200';
          background-color: #fff;
        `;
      case '삭제':
        return css`
          border: 3px solid '#e15757';
          background-color: #fff;
        `;
      case '저장':
        return css`
          border: 3px solid '#38a169';
          background-color: #fff;
        `;
      case '닫기':
        return css`
          border: 3px solid '#777';
          background-color: #fff;
        `;
      default:
        return css`
          border: 3px solid '#777';
          background-color: #fff;
        `;
    }
  }} */

  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${({ action }) => {
      switch (action) {
        case '수정':
          return '#ffb200';
        case '삭제':
          return '#e15757';
        case '저장':
          return '#38a169';
        case '닫기':
          return '#777';
        default:
          return '#777';
      }
    }};
    color: #fff;
  }
`;

function StyleButton() {
  return (
    <div>
      <StButton></StButton>
    </div>
  );
}

export default StyleButton;
