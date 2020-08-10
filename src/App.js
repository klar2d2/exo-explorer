import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Galaxy from './Galaxy';
import Cursor from './Cursor';

function App() {
  const [stars, setStars] = useState([]);
  const [visibleMagnitude, setVisibleMagnitude] = useState(6.5)
  const [scale, setScale] = useState(1);
  const [oldRanges, setOldRanges] = useState([]);
  const [range, setRange] = useState([[0,360],[0,180]])
  const [doneCanvas, setDoneCanvas] = useState(false)

  useEffect(() =>{
    const [[xRangeMin, xRangeMax], [yRangeMin, yRangeMax]] = range;
        axios.get(`https://exo-explorer-server.herokuapp.com/stars/${visibleMagnitude}/${xRangeMin},${xRangeMax}/${yRangeMin},${yRangeMax}`)
    .then((response) => {
      setStars(response.data.stars);
      setDoneCanvas(true);
      console.log('setDoneCanvas', setDoneCanvas)
    })
  },[range]);

  const canvasHeight = window.innerHeight;
  const canvasWidth = window.innerWidth;
  const zoomIn = (cursorOriginX, cursorOriginY) => {
    const [[ xMin, xMax ], [ yMin, yMax ]] = range;
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const newMinX = xMax - (1-(cursorOriginX/canvasWidth)) * xRange;
    const newMaxX = xMax - (1-((cursorOriginX+400)/canvasWidth)) * xRange;
    const newMinY = yMax - (1-(cursorOriginY/canvasHeight)) * yRange;
    const newMaxY = yMax - (1-((cursorOriginY+200)/canvasHeight)) * yRange;
    setOldRanges(oldRanges.concat([range]));
    setRange([[newMinX, newMaxX],[newMinY, newMaxY]]);
    const newScale = scale * 4;
    setScale(newScale);
    console.log(range)
  }
  const zoomOut = (mouseX, mouseY) => {
    if (oldRanges.length > 0) {
      const backOneRange = oldRanges.pop()
      console.log([backOneRange[0], backOneRange[1]], 'backone')
      setRange([backOneRange[0],backOneRange[1]])
      const newScale = scale / 4
      setScale(newScale)

    }
    // const newMaxX = ((mouseX+400)*oldMaxX)/canvasWidth;
    // newMaxX * canvasWidth = (mouseX+400) * oldMaxX
    // (newMaxX * canvasWidth)/ (mouseX+400) = oldMaxX
  }
  if (doneCanvas) {
    return(
      <div className="App">
        <Galaxy
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          visibleMagnitude={visibleMagnitude}
          scale={scale}
          stars={stars}
          range={range}
          doneCanvas={doneCanvas}
        />
        <Cursor
          zoomIn={zoomIn}
          zoomOut={zoomOut}
        />
      </div>
    )
  }
  else {
    return (
      <div className="loading">
        
      </div>
    );
  }
}

export default App;
