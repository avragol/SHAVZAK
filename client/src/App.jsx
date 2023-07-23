import './App.css';

import Router from './routes/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='bg-bgcColor dark:bg-dark-background dark:text-dark-text min-h-screen flex flex-col justify-between'>
      <header><Navbar /></header>
      <main className='max-w-screen-lg  md:min-w-full mx-auto'><Router /></main>
      <Footer />
    </div>
  );
}

export default App;
