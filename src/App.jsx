import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';

import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
import { db } from './data/db'

function App() { 
  const [data, setData] = useState(db);
  const [dataCart, setDataCart] = useState([]);
  const notify = () => toast.success('Agregado a tu carrito.');

  function clearCart(){
    setDataCart([]);
  }

  const deleteFromCart = (idGuitar) => {    
    setDataCart( prevState => prevState.filter(guitar => guitar.id != idGuitar));
  }
   
  const addToCart = (newGuitar) => {
    notify();
    const indexGuitar = dataCart.findIndex(guitar => guitar.id == newGuitar.id);
    
    if(indexGuitar == -1){
      newGuitar.quantity = 1;
      setDataCart([...dataCart, newGuitar] );
    }else{
      increseQuantity(indexGuitar);
    }
  }

  function increseQuantity(index){
    const updateArr = [...dataCart];
    updateArr[index].quantity++; 
    setDataCart(updateArr);
  }
  

  function decreseQuantity(idGuitar){
    const index = dataCart.findIndex(guitar => guitar.id == idGuitar);    
    
    const updateArr = [...dataCart];    
    updateArr[index].quantity--;
    updateArr[index].quantity == 0 ? deleteFromCart(idGuitar) : setDataCart(updateArr);
  }

  return (
    <>
      <Header
        clearCart={clearCart}
        selectedGuitars={dataCart}        
        updateDataCart={deleteFromCart}
        increseQuantity={increseQuantity}
        decreseQuantity={decreseQuantity}
      ></Header>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>        
        <div className="row mt-5">
          { 
            data.map((guitar, index) => {
              return <Guitar
                key={index}
                data={guitar}                                
                addToCart={addToCart}
              />
            })
          }          
        </div>
      </main>

      <Footer />

      <Toaster position='top-left'/>
    </>
  );
}

export default App
