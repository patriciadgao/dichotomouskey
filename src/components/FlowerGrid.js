import { FlowerCard, FlowerCardPhotoOnly } from './FlowerCard';
import {flowers} from "../flowers/flowers.js";
import { useState} from "react";
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {LazyLoadImage} from "react-lazy-load-image-component";
import { Label, Value, ValueItalic } from './AttributeComponents';
import { SearchBar } from './SearchBar';
import { Colorblock } from './Colorblock';
import { Chip } from './Chip';

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
        <Modal 
            isOpen={modalOpen} 
            onRequestClose={hideModal} 
            closeTimeoutMS={400}
            className="bg-white sm:mt-[10vh] mt-[5vh] overflow-auto max-h-[95vh] sm:max-h-[90vh] w-[90vw] focus:outline-0 text-slate-600 sm:w-[50vw] max-w-[550px] min-h-[50vh] m-auto shadow-[0_0_25px_-5px_rgba(0,0,0,0.2)] rounded-sm transition-all" 
        >
            {selectedFlower && <div>
                <div className="top-0 sticky flex justify-between items-center bg-white py-4 px-6">
                    <div className="w-8"></div>
                <div className="font-bold"><h1>{selectedFlower.name}</h1></div>
            <div className="cursor-pointer p-2 text-xl hover:text-slate-400" onClick={() => {
                setSelectedFlower(undefined);
                hideModal();
            }}>
            <FontAwesomeIcon icon={faTimesCircle}/></div>
            </div>
            <div className="space-y-2 px-6 pb-4">
            <div className="flex justify-center">
            <LazyLoadImage
                alt={"image of " + selectedFlower.name}
                className="object-cover w-72 h-72 rounded-md"
                src={require("../flowers/photos/" + selectedFlower.name + ".jpg")}
                placeholder={<div className="w-72 h-72 bg-gray-100"></div>}
            />
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="pt-4 grid grid-cols-2 gap-x-2">
                    <Label>genus</Label>
                    <ValueItalic>{selectedFlower.genus}</ValueItalic>
                    <Label>colors</Label>
                    <div className="flex items-center space-x-1.5">{selectedFlower.colors.map((c) => <Colorblock nameOfColor={c}/>)}</div>
                    <Label>petals</Label>
                    <Value>{selectedFlower.petals} {selectedFlower.edge.join(", ")}</Value>
                    <Label>size & shape</Label>
                    <Value>{selectedFlower.size} {selectedFlower.shape}</Value>
                    <Label>tree?</Label>
                    <Value>{selectedFlower.tree}</Value>
            </div>
            </div>
            <div className="p-4 flex flex-col items-center text-left">{selectedFlower.description}</div>
            </div>
            </div>}
        </Modal>
      </div>
      </div>
  );
}