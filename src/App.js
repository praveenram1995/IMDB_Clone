import React from 'react';
// import logo from './logo.svg';
import PostList from './components/PostList';
import './App.css';
import Navbar from './components/Navbar';

function ProductApp() {
  return (
    <div className="App">
      <Navbar />
      <div className="Message welcome">GIFs, uh, find a way.</div>
      <PostList />
    </div>
  );
}

export default ProductApp;
