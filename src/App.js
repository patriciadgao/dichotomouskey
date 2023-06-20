import React, { useState } from 'react';
import { About } from './components/About';
import { FlowerGrid } from './components/FlowerGrid';
import { FlowerList } from './components/FlowerList';
import { Footer } from './components/Footer';
import { NavButtons } from './components/NavButtons';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState("grid");

  function showModal() {
    setModalOpen(true);
  }

  function hideModal() {
    setModalOpen(false);
  }

  return (
    <div className="text-center bg-pink-200 text-slate-600 min-h-screen">
      <header className="text-4xl pt-16 pb-5">
        <h1 id="webtitle">Pat's Flowers</h1>
      </header>
      <NavButtons setView={setView} view={view} />
      {view === "about" && <About />}
      {view === "list" && <FlowerList showModal={showModal} hideModal={hideModal} modalOpen={modalOpen} />}
      {view === "grid" && <FlowerGrid showModal={showModal} hideModal={hideModal} modalOpen={modalOpen} />}
      <Footer />
    </div>
  );
}

export default App;
