import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from "./pages/Top";
import Watch from './pages/Watch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
