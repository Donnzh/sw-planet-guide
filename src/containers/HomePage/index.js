import React from 'react';
import PlanetTable from'./PlanetTable'

const style = {
  appContainer: {textAlign: 'center'},
  header:{
    background: '#000 url(//cssanimation.rocks/demo/starwars/images/bg.jpg)',
    height: '160px',
    padding: '20px',
    color: 'white'
  },
  title: {
    margin: '14px'
  }
}

export default class HomePage extends React.Component {
  render () {
    return (
      <div style={style.appContainer}>
        <header style={style.header}>
          <div>
            <img src="//cssanimation.rocks/demo/starwars/images/star.svg" width="170px" height="50px" alt="Star"/>
            <h4 style={style.title}>Planet Guide</h4>
            <img src="//cssanimation.rocks/demo/starwars/images/wars.svg" width="170px" height="50px" alt="Wars"/>
          </div>
        </header>
        <PlanetTable />
      </div>)
  }
}

