import { FlowerCard } from './FlowerCard';
import {flowers} from "../flowers/flowers.js";
import {useEffect, useState} from "react";
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {LazyLoadImage} from "react-lazy-load-image-component";
import { Label, Value } from './AttributeComponents';

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

  return (
      <div className="flex flex-wrap items-stretch px-5">
        {
          shuffledFlowers.map((flower, i) => (
            <FlowerCard key={i} flower={flower} onClick={() => {
                setSelectedFlower(flower);
                showModal();
            }}/>
          ))
        }
        <Modal 
            isOpen={modalOpen} 
            onRequestClose={hideModal} 
            closeTimeoutMS={400}
            className="focus:outline-0 text-slate-600 w-[50vw] max-w-[650px] min-h-[50vh] bg-white m-auto mt-[15vh] shadow-[0_0_25px_-5px_rgba(0,0,0,0.2)] rounded-sm transition-all" 
        >
            {selectedFlower && <div className="px-6 py-4 space-y-2">
                <div className="flex justify-between items-center">
                    <div className="w-8"></div>
                <div className="font-bold"><h1>{selectedFlower.name}</h1></div>
            <div className="cursor-pointer p-2 text-xl hover:text-slate-400" onClick={() => {
                setSelectedFlower(undefined);
                hideModal();
            }}>
            <FontAwesomeIcon icon={faTimesCircle}/></div>
            </div>
            <div className="flex justify-center">
            <LazyLoadImage
                alt={"image of " + selectedFlower.name}
                className="object-cover w-72 h-72 rounded-md"
                src={require("../flowers/photos/" + selectedFlower.name + ".jpg")}
                placeholder={<div className="w-36 h-36 bg-gray-100"></div>}
            />
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="pt-4 grid grid-cols-2 gap-x-2">
                    <Label>genus</Label>
                    <Value>{selectedFlower.genus}</Value>
                    <Label>colors</Label>
                    <Value>{selectedFlower.colors.join(', ')}</Value>
                    <Label>petals</Label>
                    <Value>{selectedFlower.petals} {selectedFlower.edge.join(", ")}</Value>
                    <Label>size & shape</Label>
                    <Value>{selectedFlower.size} {selectedFlower.shape}</Value>
                    <Label>tree?</Label>
                    <Value>{selectedFlower.tree}</Value>
            </div>
            </div>
            <div className="p-4 flex flex-col items-center text-left">{selectedFlower.description}</div>
            </div>}
        </Modal>
      </div>
  );
}