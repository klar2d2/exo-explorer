const axios = require('axios');
const fs = require('fs');

const PLANET_API_URL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI';
const PLANET_COLUMNS = 'pl_name,pl_orbper,pl_orbsmax,pl_orbeccen,pl_bmasse,pl_rade,pl_dens';
const STAR_COLUMNS = 'pl_hostname,st_dist,st_teff,st_mass,st_rad,st_dens,st_lum,st_glon,st_glat';
const SYSTEM_COLUMNS = 'pl_pnum';
const columns = `${PLANET_COLUMNS},${STAR_COLUMNS},${SYSTEM_COLUMNS}`
const format = 'json';
const PLANET_API_REQUEST_OBJECT = {
  method: 'get',
  url:`${PLANET_API_URL}?table=exoplanets&select=${columns}&order=dec&format=${format}`
}

axios(PLANET_API_REQUEST_OBJECT).then((response) => {
  const systems = {};
  response.data.forEach((planetData) => {
    const systemName = planetData.pl_hostname;
    if (systems.hasOwnProperty(systemName)) {
      const planet = {
          density: planetData.pl_dens,
          name: planetData.pl_name,
          mass: planetData.pl_bmasse,
          orbit: {
            eccentricity: planetData.pl_orbeccen,
            period: planetData.pl_orbper,
            semiMajorAxis: planetData.pl_orbsmax,
          },
          radius: planetData.pl_rade,
        }
      systems[systemName].planets.push(planet)
    } else {
      const system = {
        planets: [
          {
            density: planetData.pl_dens,
            name: planetData.pl_name,
            mass: planetData.pl_bmasse,
            orbit: {
              eccentricity: planetData.pl_orbeccen,
              period: planetData.pl_orbper,
              semiMajorAxis: planetData.pl_orbsmax,
            },
            radius: planetData.pl_rade,
          }
        ],
        starInfo : {
          density: planetData.st_dens,
          distance: planetData.st_dist,
          galacticLatitude: planetData.st_glat,
          galacticLongitude: planetData.st_glon,
          luminosity: planetData.st_lum,
          name: planetData.pl_hostname,
          mass: planetData.st_mass,
          radius: planetData.st_rad,
          temperature: planetData.st_teff,
        },
      }
      systems[planetData.pl_hostname] = system
    }
  })
  fs.writeFileSync('systems.json', JSON.stringify(systems));
});
