import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsGithub, BsFacebook } from 'react-icons/bs';
import { SiNotion } from 'react-icons/si';

const Footer = () => {
  return (
    <StFooter>
      <div className="inner">
        <div className="icons">
          <Link>
            <SiNotion className="icon-notion" />
          </Link>
          <Link to="https://github.com/immutableTeam9/pawMates">
            <BsGithub className="icon-github" />
          </Link>
          <Link>
            <BsFacebook className="icon-facebook" />
          </Link>
        </div>
        <div>
          <p>creator: immutable team 9 (이지은, 윤수민, 임지영, 정봉호)</p>
          <p>Copyright 2023 immutable. All Rights Reserved</p>
        </div>
      </div>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  height: 250px;
  display: flex;
  align-items: center;
  background-color: #97d0ff;

  & .inner {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 1200px;
    min-width: 360px;
    margin: 0 auto;
    padding: 0 16px;
  }

  & .icons {
    & svg {
      color: #fff;
    }
    & .icon-notion {
      margin-right: 10px;
      font-size: 32px;
    }
    & .icon-github {
      margin-right: 10px;
      font-size: 35px;
    }
    & .icon-facebook {
      font-size: 35px;
    }
  }

  & p {
    margin: 0;
    line-height: 2;
    color: #fff;
    font-size: 14px;

    & a {
      color: #fff;
    }
  }
`;
