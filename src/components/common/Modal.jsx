import React from 'react';
import styled from 'styled-components';

export default function Modal({ children }) {
  return (
    <StBackdrop>
      <StModalContent>{children}</StModalContent>
    </StBackdrop>
  );
}

const StBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const StModalContent = styled.div`
  position: relative;
  width: 50%;
  height: 50vh;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  overflow-y: auto;
`;
