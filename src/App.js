import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PizzaProvider from './context/PizzaContext';
import Header from './components/Header';
import Home from './views/Home';
import Cart from './views/Cart';
import PizzaDetalle from './views/PizzaDetalle';

function App() {
  return (
    <>
    <PizzaProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route
          path="/pizza/:pizzaId"
          element={
            <PizzaDetalle />
          }
          />
          <Route
          path="/cart"
          element={
            <Cart/>
          }
          />
        </Routes>
    </BrowserRouter>
    </PizzaProvider>
    </>
  );
}

export default App;
