import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';
import { styled } from 'styled-components';

const Search = ({ setPosts }) => {
  const [word, setWord] = useState('');

  const tags = useSelector((state) => state.tags);
  const fetchPosts = useSelector((state) => state.posts);

  const searchHandler = async (e, tag) => {
    e.preventDefault();
    console.log(fetchPosts);
    const searchFunc = (keyword) => {
      const searchWord = keyword.toLowerCase();
      const searchPost = fetchPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(searchWord) ||
          post.body.toLowerCase().includes(searchWord) ||
          post.nickName.toLowerCase().includes(searchWord)
        );
      });
      const searchTag = fetchPosts.filter((post) => {
        return typeof post.tags === 'string' && post.tags.toLowerCase().includes(searchWord);
      });
      searchPost.push(...searchTag);
      const setSearchPost = new Set(searchPost);
      if (searchPost.length !== 0) {
        setPosts([...setSearchPost]);
        setWord('');
      } else {
        alert('검색 결과가 없습니다!');
      }
    };

    if (word) {
      searchFunc(word);
    } else if (tag) {
      searchFunc(tag);
    } else if (word == false) {
      alert('검색어를 입력하세요!');
    }
  };

  const redoButtonHandler = () => {
    setPosts([fetchPosts]);
  };

  const tagButtonHandler = (e, tag) => {
    const newtag = tag.replace(/#/g, '');
    searchHandler(e, newtag);
  };

  const getButtonColor = (tag) => {
    switch (tag) {
      case '#강아지':
        return '#FFB6C1';
      case '#고양이':
        return '#87CEEB';
      case '#간식':
        return '#FFE0A3';
      case '#음식':
        return '#FFCC99';
      case '#병원':
        return '#AED6F1';
      default:
        return '#777';
    }
  };
  return (
    <>
      <StSearch className="search">
        <form onSubmit={searchHandler}>
          <label>
            <input
              placeholder="Search"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
              }}
            />
            <button>
              <FaSearch />
            </button>
            {/* <button type="button" onClick={redoButtonHandler}>
              <FaRedoAlt />
            </button> */}
          </label>
        </form>
      </StSearch>
      <div className="tag-buttons">
        {tags.map((tag) => {
          return (
            <div key={tag}>
              <StTagButton $btnColor={getButtonColor(tag)} onClick={(e) => tagButtonHandler(e, tag)}>
                {tag}
              </StTagButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Search;

const StSearch = styled.div`
  & label {
    display: flex;
  }
  & input {
    width: 460px;
    padding: 12px;
    margin: 10px;
    margin-right: 10px;
    border-radius: 8px;
    border: 3px solid #ffb200;
    box-shadow: 0px 0px 9px 3px #00000014;
    transition: 0.3s ease-out;
  }

  & input:focus {
    border: 3px solid #239cff;
    outline: none;
  }

  & button {
    cursor: pointer;
    transform: translate(-60px, 2px);
    border: none;
    background-color: transparent;
    font-size: 28px;
    transition: 0.3s ease-out;
    margin-right: 15px;
    & svg {
      color: #ffb200;
    }
  }

  & button:hover {
    & svg {
      color: #239cff;
    }
  }
`;

const StTagButton = styled.button`
  cursor: pointer;
  width: 80px;
  height: 32px;
  border: none;
  border-radius: 8px;
  margin: 11px;
  transition: 0.3s ease-out;

  &:hover {
    background-color: ${(props) => props.$btnColor};
  }
`;
