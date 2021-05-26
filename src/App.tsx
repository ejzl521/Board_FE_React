import React from 'react';
import './App.css';
import BoardList from "./pages/board-list/BoardList";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import BoardRegister from './pages/board-register/BoardRegister';
import BoardView from "./pages/board-view/BoardView";
import BoardEdit from "./pages/board-edit/BoardEdit";

function App() {
  return (
    <Container className="p-5">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={BoardList}/>
          <Route path="/add" component={BoardRegister}/>
          <Route path="/board-view/:id" component={BoardView}></Route>
          <Route path="/board-edit/:id" component={BoardEdit}></Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
