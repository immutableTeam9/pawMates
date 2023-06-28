import React, { useState } from 'react';

const Search = ({ posts, setPosts }) => {
  const [word, setWord] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    // const searchWord = word.toLowerCase().split('');
    const searchWord = word.toLowerCase();
    const searchPost = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchWord) || post.body.toLowerCase().includes(searchWord);
    });
    setPosts(searchPost);
  };

  return (
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
  );
};

export default Search;
