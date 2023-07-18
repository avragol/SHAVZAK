import './App.css';

import Router from './routes/Router';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='bg-bgcColor h-screen '>
      <header><Navbar /></header>
      <main className='max-w-screen-lg mx-auto'><Router /></main>
      <footer><h3>footer</h3></footer>
    </div>
  );
}

export default App;
