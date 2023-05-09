import { FlowerGrid } from './components/FlowerGrid';
import React from 'react';

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);

  function showModal() {
    setModalOpen(true);
  }

  function hideModal() {
    setModalOpen(false);
  }

  return (
    <div className="text-center bg-pink-200 text-slate-600" id="page">
      <header className="font-bold text-xl pt-20 pb-5">
        <h1>Pat's Flowers</h1>
      </header>
      <FlowerGrid showModal={showModal} hideModal={hideModal} modalOpen={modalOpen}/>
      <div className="mt-10">
      <a className="text-slate-900" href="https://www.flaticon.com/free-icons/flower" title="flower icons">Flower icon created by Smashicons - Flaticon</a></div>
    </div>
  );
}

export default App;
