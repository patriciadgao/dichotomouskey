import { useState } from "react";
import { flowers } from "../flowers/flowers.js";
import { FlowerCard, FlowerCardPhotoOnly } from './FlowerCard';
import { FlowerModal } from './FlowerModal';
import { SearchBar } from './SearchBar';

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

const shuffledFlowers = shuffleArray([...flowers]);

export function FlowerGrid(props) {
    const {showModal, hideModal, modalOpen} = props;
    const [selectedFlower, setSelectedFlower] = useState(undefined);
    const [flowerList, setFlowerList] = useState([]);
    const [photosOnly, setPhotosOnly] = useState(false);

  return (
    <div>
      <SearchBar setFlowerList={setFlowerList} shuffledFlowers={shuffledFlowers}/>
      <div className="flex justify-end mb-2 mr-12 space-x-2 items-center hover:cursor-pointer hover:underline" onClick={() => setPhotosOnly(!photosOnly)}>
          <input 
            type="checkbox" 
            checked={photosOnly} 
            readOnly
            className="w-5 h-5 checked:text-pink-300 outline-0 border-none rounded-sm focus:ring-0 shadow"
          /><div>show photos only</div>
      </div>
      <div className="flex flex-wrap items-stretch px-8 pb-5">
        {
          flowerList.length > 0 ?
          (photosOnly ? flowerList.map((flower, i) => (
            <FlowerCardPhotoOnly key={i} flower={flower} onClick={() => {
              setSelectedFlower(flower);
              showModal();
            }}/>
          )) : flowerList.map((flower, i) => (
            <FlowerCard key={i} flower={flower} onClick={() => {
                setSelectedFlower(flower);
                showModal();
            }}/>
          ))) : <div className="m-auto mt-4">No flowers to show!</div>
        }
        <FlowerModal
          modalOpen={modalOpen}
          hideModal={hideModal}
          selectedFlower={selectedFlower}
          setSelectedFlower={setSelectedFlower}
        />
      </div>
      </div>
  );
}