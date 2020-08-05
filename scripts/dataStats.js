const fs = require('fs');
const stats = {}
const sectors = [1,2,3,4,5,6,7,8];
const quadrants = [1,2,3,4,5];
sectors.forEach((sector) => {
  quadrants.forEach((quadrant) => {
    const data = fs.readFileSync(`stars-${sector}-${quadrant}.json`);
    const json = JSON.parse(data);
    let maxLat = -Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let minLon = Infinity;
    let minMag = Infinity;
    let maxMag = -Infinity;
    json.forEach((star) => {
      const [galacticLatitude, galacticLongitude, luminosity, radius,temperature, magnitude] = star;
      if (magnitude > maxMag) {
        maxMag = magnitude;
      }
      if (magnitude < minMag) {
        minMag = magnitude;
      }
      if (galacticLatitude > maxLat) {
        maxLat = galacticLatitude;
      }
      if (galacticLatitude < minLat) {
        minLat = galacticLatitude;
      }
      if (galacticLongitude > maxLon) {
        maxLon = galacticLongitude;
      }
      if (galacticLongitude < minLon) {
        minLon = galacticLongitude;
      }
    })
    stats[`${sector}-${quadrant}`] = { minLat, maxLat, minLon, maxLon, minMag, maxMag}
  })
})
console.log(stats);