import logo from './logo.svg';
import './App.css';
import User from './API/User';
import { Jumbotron } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Jumbotron className="big-banner">
        <h1 className="heading">CRUD</h1>
        <User />
      </Jumbotron>
    </div>
  );
}

export default App;
