import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/Router';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <header><Navbar /></header>
      <main><Router /></main>
      <footer><h3>footer</h3></footer>
    </BrowserRouter>
  );
}

export default App;
