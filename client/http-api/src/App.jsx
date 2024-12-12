import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Client from './Client';
import Post from './Post';
import Delete from './Delete';
import Update from './Update';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for your components */}
        
        <Route path='/' element={<Post />} />
        <Route path='/delete' element={<Delete />} />
        <Route path='/client' element={<Client />} />
        <Route path='/update' element={<Update/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
