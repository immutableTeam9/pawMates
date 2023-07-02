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

  width: 80%;
  max-width: 500px;
  padding: 2rem 1.5rem;
  background-color: #fff;
  border-radius: 5px;
  overflow-y: auto;
  box-sizing: border-box;

  & h3 {
    margin: 0 0 2rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
  }
  & .input-box {
    margin-bottom: 1rem;
  }

  & label {
    font-size: 0.9rem;
  }

  & input,
  select {
    padding: 0.25rem;
    font-size: 0.9rem;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & .button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
  }

  & button {
    padding: 4px 20px;
    font-size: 0.9rem;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }

  & .btn-cancel {
    color: #fff;
    background: #777;
  }

  & .btn-modify {
    color: #fff;
    background: #ffb200;
  }

  & .btn-success {
    color: #fff;
    background: #38a169;
  }
`;
