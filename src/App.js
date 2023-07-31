import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { About } from './components/About';
import { Colorblock, getHexCode } from './components/Colorblock';
import { FlowerGrid } from './components/FlowerGrid';
import { FlowerList } from './components/FlowerList';
import { LastUpdatedInfo } from './components/LastUpdatedInfo';
import { NavButtons } from './components/NavButtons';

const bgOptions = ["bg-pink", "bg-green", "bg-blue"];

function App() {
  const [bgColor, setBgColor] = useState(
    localStorage.getItem('bg-color') ?? "bg-green"
  );

  const changeBgColor = useCallback((color) => {
    setBgColor(color);
    localStorage.setItem('bg-color', color);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('grid')
    }
  }, [location, navigate])

  return (
    <div className="text-center text-slate-600 min-h-screen" style={{ backgroundColor: getHexCode(bgColor) }}>
      <div className="p-2 flex justify-end space-x-2">
        {bgOptions.map((color, i) => (
          <div key={i} className="hover:cursor-pointer" onClick={() => {
            changeBgColor(color);
          }}>
            <Colorblock nameOfColor={color} />
          </div>
        ))}
      </div>
      <header>
        <h1 id="webtitle" className="text-4xl pt-16 pb-3">Pat's Flowers</h1>
        <LastUpdatedInfo />
      </header>
      <NavButtons bgColor={bgColor} />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="list/*" element={<FlowerList bgColor={bgColor} />} />
        <Route path="grid/*" element={<FlowerGrid />} />
      </Routes>
    </div>
  );
}

export default App;
