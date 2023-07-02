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
        return '#939393';
      default:
        return '#939393';
    }
  }};

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
          return '#939393';
        default:
          return '#939393';
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
