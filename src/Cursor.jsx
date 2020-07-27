import React, { useEffect, useState } from 'react';

const Cursor = (props) => {
  // TODO Change mouseX and mouseY to cursorOriginX and cursorOriginY
    const { zoomIn, zoomOut } = props;
    const [mouseX,setMouseX] = useState(0);
    const [mouseY,setMouseY] = useState(0);

    const handleMouseMove = (e) => {
        setMouseX(e.nativeEvent.offsetX - 200);
        setMouseY(e.nativeEvent.offsetY - 100);
      }
    
    const handleClick = () => {
      zoomIn(mouseX, mouseY)
      }
    const handleDoubleClick = () => {
      zoomOut(mouseX, mouseY);
      }

    useEffect(() => {
        var canvas = window.document.getElementById('cursor');
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.strokeStyle ='white';
        ctx.rect(mouseX,mouseY, 400,200);
        ctx.stroke();
    })

    return(
        <canvas 
          id='cursor'
          className='canvas' 
          onMouseMove={handleMouseMove} 
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        />
    )
};

export default Cursor;
