import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ProjectCounter from './project-counter';
import ProjectAdder from './project-adder';
import ProjectList from './project-list';
import './app.css';

class App extends Component {
  render () {
    return (
      <div className="app-root">
        <div className="head-section">
          <ProjectAdder/>
          <div className="root-counter-wrap">
            <div className="root-counter-label">Total</div>
            <ProjectCounter source={[1, 2, 3]}/>
          </div>
        </div>
        <div className="main-section">
          <ProjectList key="1" listId={1}/>
          <ProjectList key="2" listId={2}/>
          <ProjectList key="3" listId={3}/>
        </div>
      </div>
    );
  }
}

// const App = () => (
//   <div className="app-root">
//     <div className="head-section">
//       <ProjectAdder/>
//       <div className="root-counter-wrap">
//         <div className="root-counter-label">Total</div>
//         <ProjectCounter source={[1, 2, 3]}/>
//       </div>
//     </div>
//     <div className="main-section">
//       <ProjectList key="1" listId={1}/>
//       <ProjectList key="2" listId={2}/>
//       <ProjectList key="3" listId={3}/>
//     </div>
//   </div>
// );

export default DragDropContext(HTML5Backend)(App);
