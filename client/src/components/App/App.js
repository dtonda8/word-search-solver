import Home from '../Home/Home';
import Nav from '../NavBar/NavBar.tsx';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';

function App() {

  return (
    <ChakraProvider>
      <Nav />
      <div className="App">
        <Home />
      </div>
    </ChakraProvider>
  );
}

export default App;