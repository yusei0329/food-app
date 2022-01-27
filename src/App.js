import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from "./pages/Top";
// import Watch from "./pages/Watch";
// import Search from './pages/Search';
// import Default from './pages/default';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          {/* <Route path="/watch" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/default" element={<Default />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
