const convertEquatorialToGalatic = (ra,dec) => {
  const decRadians = dec * 0.01745329252;
  const raRadians = ra * 0.01745329252;
  const l0 = 33 * 0.01745329252;
  const sinOfDeclination = Math.sin(decRadians);
  const cosOfDeclination = Math.cos(decRadians);
  const sinOfRightAscension = Math.sin(raRadians - (282.25 * 0.01745329252));
  const cosOfRightAscension = Math.cos(raRadians);
  const sinOfNGPDeclination = Math.sin(27.1284 * 0.01745329252);
  const cosOfNGPDeclination = Math.cos(27.1284 * 0.01745329252);
  
  const b = Math.asin((sinOfDeclination * Math.cos(62.6 * 0.01745329252)) - (cosOfDeclination * sinOfRightAscension * Math.sin(62.6 * 0.01745329252)))
  const l = Math.acos((cosOfDeclination * cosOfRightAscension)/Math.cos(b)) + l0








  // const sinOfB = (sinOfDeclination * Math.cos(62.6 * 0.01745329252)) - (cosOfDeclination * sinOfRightAscension * Math.sin(62.6 * 0.01745329252))
  // const sinOfB = (sinOfNGPDeclination * sinOfDeclination) + (cosOfNGPDeclination * cosOfDeclination * cosOfRightAscension);
  // const b = Math.asin(sinOfB) * 57.2958;
  // const cosOfB = Math.cos(b * 0.01745329252);
  // const cosOfL0MinusL = (cosOfDeclination * cosOfRightAscension)/cosOfB;
  // const sinOfL0MinusL = ((sinOfDeclination*Math.sin(62.6*0.01745329252)) + (cosOfDeclination * sinOfRightAscension * Math.cos(62.6*0.01745329252)))/Math.cos(b);
  // console.log(cosOfL0MinusL)
  // const l = (Math.acos(cosOfL0MinusL) + (33 * 0.01745329252)) * 57.2958;
  console.log(b * 57.2958, l * 57.2958);
}

convertEquatorialToGalatic(242.5635,-83.768388)

// {
//   "HD 142022 A":
//   {
//     "starInfo":
//     {
//       "density":null,
//       "distance":34.31,
//       "galacticLatitude":-23.31723,
//       "galacticLongitude":307.720278,
//       "luminosity":null,
//       "name":"HD 142022 A",
//       "mass":0.9,
//       "radius":1.04,
//       "temperature":5421
//     }
//   }
// }