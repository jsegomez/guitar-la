import { useState } from 'react'

import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
import { db } from './data/db'

function App() { 
  const [data, setData] = useState(db);
  const [dataCart, setDataCart] = useState([]);

  const addToCart = (newGuitar) => {
    const indexGuitar = dataCart.findIndex(guitar => guitar.id == newGuitar.id);

    if(indexGuitar == -1){
      newGuitar.quantity = 1;
      setDataCart([...dataCart, newGuitar] );
    }else{
      const updateArr = [...dataCart];
      updateArr[indexGuitar].quantity++; 
      setDataCart(updateArr);
    }
  }

  return (
    <>
      <Header
        selectedGuitars={dataCart}
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
    </>
  );
}

export default App
