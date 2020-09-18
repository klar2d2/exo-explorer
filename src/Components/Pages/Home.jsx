import React, { useEffect, useState } from 'react';

export default function Home () {
  return (
    <div className='front-page'>
      <div className='front-page-info'>
        <h1 className='title-front-page'>Exo-Planet Explorer</h1>
        <h2>Similar Orbits, Worlds Apart</h2>
        <p>
          Astronomy is an ever expanding science, with terabytes of data being
          uploaded every day. Our goal is to digest and display one of the most
          exciting topics of current Astronomy research: Exo Planets! Join us in exploring our galaxy
          while taking a closer look at the stars and planets currently confirmed. Our data stems
          from the Gaia 2 database and Nasa's Exo Planet archive.
        </p>
      </div>
    </div>
  )
}
