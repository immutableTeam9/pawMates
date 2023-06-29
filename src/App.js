import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import DetailComments from './components/DetailComments';
import DetailPost from './components/DetailPost';

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <div>
        <DetailPost />
        <DetailComments />
      </div>
    </>
  );
}
