import React, { useCallback, useState } from 'react';
import { About } from './components/About';
import { Colorblock, getHexCode } from './components/Colorblock';
import { FlowerGrid } from './components/FlowerGrid';
import { FlowerList } from './components/FlowerList';
import { Footer } from './components/Footer';
import { NavButtons } from './components/NavButtons';

const bgOptions = ["bg-pink", "bg-green", "bg-blue"];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [bgColor, setBgColor] = useState(
    localStorage.getItem('bg-color') ?? "bg-green"
  );

  const changeBgColor = useCallback((color) => {
    setBgColor(color);
    localStorage.setItem('bg-color', color);
  }, []);

  function showModal() {
    setModalOpen(true);
  }

  function hideModal() {
    setModalOpen(false);
  }

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
      <header className="text-4xl pt-16 pb-5">
        <h1 id="webtitle">Pat's Flowers</h1>
      </header>
      <NavButtons setView={setView} view={view} bgColor={bgColor} />
      {view === "about" && <About />}
      {view === "list" && <FlowerList showModal={showModal} hideModal={hideModal} modalOpen={modalOpen} />}
      {view === "grid" && <FlowerGrid showModal={showModal} hideModal={hideModal} modalOpen={modalOpen} />}
      <Footer />
    </div>
  );
}

export default App;
