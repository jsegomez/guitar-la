import { useState, useEffect, useMemo } from "react";
import { toast } from 'react-hot-toast';
import { db } from '../data/db';

export const userCart = () => {
    const [dataPage] = useState(db);
    const notify = () => toast.success('Agregado a tu carrito.');

    const initialStateDataCart = () => {
        const dataLS = localStorage.getItem('products');
        return dataLS ? JSON.parse(dataLS) : [];
    };

    const [dataCart, setDataCart] = useState(initialStateDataCart);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(dataCart));
    }, [dataCart])


    function clearCart() {
        setDataCart([]);
    }

    const deleteFromCart = (idGuitar) => {
        setDataCart(prevState => prevState.filter(guitar => guitar.id != idGuitar));
    }

    const addToCart = (newGuitar) => {
        notify();
        const indexGuitar = dataCart.findIndex(guitar => guitar.id == newGuitar.id);

        if (indexGuitar == -1) {
            newGuitar.quantity = 1;
            setDataCart([...dataCart, newGuitar]);
        } else {
            increseQuantity(indexGuitar);
        }
    }

    function increseQuantity(index) {
        const updateArr = [...dataCart];
        updateArr[index].quantity++;
        setDataCart(updateArr);
    }

    function decreseQuantity(idGuitar) {
        const index = dataCart.findIndex(guitar => guitar.id == idGuitar);

        const updateArr = [...dataCart];
        updateArr[index].quantity--;
        updateArr[index].quantity == 0 ? deleteFromCart(idGuitar) : setDataCart(updateArr);
    }

    const isEmpty = useMemo(() => dataCart.length == 0, [dataCart]);    
    const cartTotal = useMemo(() => dataCart.reduce((sum, guitar) => sum + (guitar.price * guitar.quantity), 0), [dataCart]);

    return {
        addToCart,        
        cartTotal,
        clearCart,
        dataCart,
        dataPage,
        decreseQuantity,
        deleteFromCart,
        increseQuantity,
        isEmpty
    }
}

