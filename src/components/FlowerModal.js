import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from 'react-modal';
import { Label, Value, ValueItalic } from './AttributeComponents';
import { Colorblock } from './Colorblock';

Modal.defaultStyles.overlay.backgroundColor = '#ffffff80';
Modal.setAppElement('body');

export function FlowerModal(props) {
    const {selectedFlower, modalOpen, hideModal, setSelectedFlower} = props;
    return (
        <Modal 
            isOpen={modalOpen} 
            onRequestClose={hideModal} 
            closeTimeoutMS={400}
            className="z-50 bg-white sm:mt-[10vh] mt-[5vh] overflow-auto max-h-[95vh] sm:max-h-[90vh] w-[90vw] focus:outline-0 text-slate-600 sm:w-[50vw] max-w-[550px] min-h-[50vh] m-auto shadow-[0_0_25px_-5px_rgba(0,0,0,0.2)] rounded-sm transition-all" 
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
    )
}