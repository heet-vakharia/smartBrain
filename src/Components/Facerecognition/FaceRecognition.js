import React from 'react';
import './FaceRecognition.css'
const FaceRecognition= ({ imgUrl ,  box}) => {
    const boundingBoxes = box.map((box, i) => {
        return (
            <div 
                className='bounding-box'
                key={i}
                style={{
                    top: box.top,
                    right: box.right,
                    bottom: box.bottom,
                    left: box.left
                    }}
            ></div>
        );
});
    return(
        <div className=" center ma" >
            <div className='absolute mt2' >
                <img src={imgUrl} alt= ''  id = 'faceImg' style={{width : '500px', height :'auto'}}/>
                {/* <div className="bounding-box mzmke2u3djbw" style= {{top:box.topRow, right : box.rightCol, bottom : box.bottomRow, left:box.leftCol }}></div> */}
                {boundingBoxes}
            </div>
                    </div>
    )
}
export default  FaceRecognition;