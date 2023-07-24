import './App.css';
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

import Router from './routes/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import useLoggedIn from "./hooks/useLoggedIn";

const App = () => {

  const loggedIn = useLoggedIn();
  useEffect(() => {
    loggedIn();
  }, [loggedIn]);

  return (
    <div className='bg-bgcColor dark:bg-dark-background dark:text-dark-text min-h-screen flex flex-col justify-between'>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#66BB6A',
              color: '#333333',
            },
          },
          error: {
            style: {
              background: '#991b1b',
              color: '#d1d5db',
            },
          }
        }
        }
      />
      <header><Navbar /></header>
      <main className='max-w-screen-lg  md:min-w-full mx-auto'><Router /></main>
      <Footer />
    </div>
  );
}

export default App;
