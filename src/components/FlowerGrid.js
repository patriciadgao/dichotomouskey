import { useMemo, useState } from "react";
import Modal from 'react-modal';
import { useNavigate, useParams } from "react-router-dom";
import { flowers } from "../flowers/flowers.js";
import { FlowerCard, FlowerCardPhotoOnly } from './FlowerCard';
import { FlowerModal } from './FlowerModal';
import { SearchBar } from './SearchBar';

Modal.defaultStyles.overlay.backgroundColor = '#ffffff80';
Modal.setAppElement('body');

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
  const [flowerList, setFlowerList] = useState([]);
  const [photosOnly, setPhotosOnly] = useState(false);

  let params = useParams();
    let {"*": flowerName} = params;

    const navigate = useNavigate();

    const flower = useMemo(() => {
        return flowers.find((f) => f.name === flowerName) ?? undefined
    }, [flowerName]);

    const viewFlower = (flower) => {
        navigate(flower.name);
    };

  return (
    <div>
      <SearchBar setFlowerList={setFlowerList} shuffledFlowers={shuffledFlowers} />
      <div className="flex justify-end mb-2 mr-12 space-x-2 items-center hover:cursor-pointer" onClick={() => setPhotosOnly(!photosOnly)}>
        <input
          type="checkbox"
          checked={photosOnly}
          readOnly
          className="w-5 h-5 checked:text-pink-300 outline-0 border-none rounded-sm focus:ring-0 shadow"
        /><div>show photos only</div>
      </div>
      <div className="flex flex-wrap justify-center px-8 pb-5">
        {
          flowerList.length > 0 ?
            (photosOnly ? flowerList.map((flower, i) => (
              <FlowerCardPhotoOnly key={i} flower={flower} onClick={() => viewFlower(flower)} />
            )) : flowerList.map((flower, i) => (
              <FlowerCard key={i} flower={flower} onClick={() => viewFlower(flower)} />
            ))) : <div className="m-auto mt-4">No flowers to show!</div>
        }
        <FlowerModal selectedFlower={flower}/>
      </div>
    </div>
  );
}