import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Search = ({ setPosts }) => {
  const [word, setWord] = useState('');

  const fetchPosts = useSelector((state) => state.posts);

  const searchHandler = async (e, tag) => {
    e.preventDefault();

    if (word) {
      const searchWord = word.toLowerCase();
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
    } else if (tag) {
      const searchPost = fetchPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(tag) ||
          post.body.toLowerCase().includes(tag) ||
          post.nickName.toLowerCase().includes(tag)
        );
      });
      const searchTag = fetchPosts.filter((post) => {
        return typeof post.tags === 'string' && post.tags.toLowerCase().includes(tag);
      });
      searchPost.push(...searchTag);
      const setSearchPost = new Set(searchPost);
      setPosts([...setSearchPost]);
    } else if (word == false) {
      alert('검색어를 입력하세요!');
    }
  };

  const tags = useSelector((state) => state.tags);
  const tagButtonHandler = (e, tag) => {
    const newtag = tag.replace(/#/g, '');
    searchHandler(e, newtag);
  };

  return (
    <>
      <div>
        <form onSubmit={searchHandler}>
          <input
            placeholder="Search"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
          <button>검색</button>
        </form>
      </div>
      <div>
        {tags.map((tag) => {
          return (
            <div key={tag}>
              <button onClick={(e) => tagButtonHandler(e, tag)}>{tag}</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Search;
