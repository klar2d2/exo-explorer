import React, { useEffect, useState } from 'react';
import axios from 'axios';

const drawStar = (ctx, x, y, r, opacity, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  let g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0.0, `${color}, 1)`);
  g.addColorStop(0.2, `${color}, 1)`);
  g.addColorStop(0.5, `${color}, ${opacity})`);
  g.addColorStop(1.0, `${color}, 0)`);
  ctx.fillStyle = g;
  ctx.fill();
}

const determineColor = (color1, color2, starTemp, upperTempBound) => {
  const [red1, green1, blue1] = color1;
  const [red2, green2, blue2] = color2;
  const red = red1 + ((starTemp/upperTempBound) * (red2 - red1));
  const green = green1 + ((starTemp/upperTempBound) * (green2 - green1));
  const blue = blue1 + ((starTemp/upperTempBound) * (blue2 - blue1));
  return `rgba(${red},${green},${blue}`;
}

const pickColor = (temperature) => {
  if (temperature >= 30000) {
    return determineColor(
      [155,176,255],
      [255,255,255],
      temperature,
      50000
    );
  } else if (temperature >= 10000) {
    return determineColor(
      [170,191,255],
      [155,176,255],
      temperature,
      30000
    );
  } else if (temperature >= 7500) {
    return determineColor(
      [202,215,255],
      [170,191,255],
      temperature,
      10000
    );
  } else if (temperature >= 6000) {
    return determineColor(
      [248,247,255],
      [202,215,255],
      temperature,
      7500
    );
  } else if (temperature >= 5200) {
    return determineColor(
      [255,244,234],
      [248,247,255],
      temperature,
      6000
    );
  } else if (temperature >= 3700) {
    return determineColor(
      [255,210,161],
      [255,244,234],
      temperature,
      5200
    );
  } else {
    return determineColor(
      [255,204,111],
      [255,210,161],
      temperature,
      3700
    );
  }
}

const Galaxy = (props) => {
  const {scale, stars, range, visibleMagnitude} = props;
  const [[xMin,xMax],[yMin,yMax]] = range;
  const yRange = yMax - yMin;
  const xRange = xMax - xMin;
  // const xMax = range[0][1];
  // const yMax = range[1][1];
  // const xMin = range[0][0];
  // const yMin = range[1][0];

  useEffect(() => {
    var canvas = window.document.getElementById('galaxy');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      const {latitude, longitude, temperature, magnitude} = star;
      const y = (1 - ((yMax - latitude)/yRange)) * canvas.height;
      const x = (1 - ((xMax - longitude)/xRange)) * canvas.width;
      const color = pickColor(temperature);
      drawStar(ctx, x, y, .5*((visibleMagnitude+scale)-magnitude), .5, color)
    })
  },[stars])
  return (
      <canvas id='galaxy' className='canvas'/>
  );
};

export default Galaxy;
