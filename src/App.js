import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from "./pages/Top";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
