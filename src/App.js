import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from "./pages/Top";
import Watch from './pages/Watch';
import Loading from './pages/components/Loading/Loading';

function App() {
  return (
    <Loading>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/watch" element={<Watch />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Loading>
  );
}

export default App;
