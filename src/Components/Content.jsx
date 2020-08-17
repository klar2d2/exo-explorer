import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Galaxy from './Subcomponents/Galaxy';
import Cursor from './Subcomponents/Cursor';
import Map from './Pages/Map';
import Home from './Pages/Home';

export default function Content () {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/galaxy-map' component={Map} />
      </Switch>
    </div>
  )
}
