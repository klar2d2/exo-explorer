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
        // Big If Else statement to make sure the rectangle doesnt go outside bounds. maybe improve later
        //top left corner
        if (mouseX <= 0 && mouseY <= 0){
          ctx.rect(0,0, 400,200)
        }
        //bottomRight corner
        else if (mouseX+400 >= window.innerWidth && mouseY+200 >= window.innerHeight){
          ctx.rect(window.innerWidth - 400,window.innerHeight -200, window.innerWidth,window.innerHeight);
        }
        //top Right corner
        else if (mouseX <= 0 && mouseY+200 >= window.innerHeight){
          ctx.rect(0,window.innerHeight -200, 400 ,window.innerHeight);
        }
        //bottom Left Corner
        else if (mouseX+400 >= window.innerWidth && mouseY <= 0){
          ctx.rect(window.innerWidth - 400,0, window.innerWidth,200);
        }
        //top
        else if (mouseX <= 0){
          ctx.rect(0,mouseY, 400,200);
        }
        //side left
        else if (mouseY <= 0) {
          ctx.rect(mouseX,0, 400,200);
        }
        //side right
        else if (mouseX+400 >= window.innerWidth){
          ctx.rect(window.innerWidth-400,mouseY, window.innerWidth,200);
        }
        //bottom
        else if (mouseY+200 >= window.innerHeight){
          ctx.rect(mouseX,window.innerHeight-200, 400,window.innerHeight);
        }
        //Middle/Default positioning
        else {
          ctx.rect(mouseX,mouseY, 400,200);
        }
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
