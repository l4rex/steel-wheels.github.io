import React, { useEffect, useState } from 'react';
import './assortimen.scss'
import axios from 'axios'
import AppContext from '../../../context';


import Header from '../header/Header';
import Drawer from '../../drawer/Drawer';
import {Route, Routes} from 'react-router-dom' 
import Main from '../../../pages/Main';
import Favorites from '../../../pages/Favorites';
import Orders from '../../../pages/Orders';

const Assortiment = () => {

    const [drawerIsOpened, setDrawerIsOpened] = useState(false)
    const [wheels, setWheels] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function fetchFunc() {
            
          const cartWheelsResp = await  axios.get('https://b94150688bd72cf4.mokky.dev/cartWheels')
          const favoriteWheelsResp = await axios.get('https://b94150688bd72cf4.mokky.dev/favorites')
          const wheelsResp = await axios.get('https://b94150688bd72cf4.mokky.dev/wheels')
          
          setCartItems(cartWheelsResp.data)
          setFavorites(favoriteWheelsResp.data)
          setWheels(wheelsResp.data)
          setIsLoading(false)
          
          
        }
        
        fetchFunc()
    }, [])
    
    


    const onAddToCart = (obj) => {

        try{
            const findItem = cartItems.find(object => Number(object.parentId) === Number(obj.parentId));
            if(findItem){
            axios.delete(`https://b94150688bd72cf4.mokky.dev/cartWheels/${findItem.id}`)
            setCartItems(prev => prev.filter(el => el.parentId !== obj.parentId))
        } else {
           axios.post('https://b94150688bd72cf4.mokky.dev/cartWheels', obj).then(res => setCartItems(prev => [...prev, res.data]))
           
        }} catch(e) {
            alert(`ошибка ${e}`)
        }
        

    }


    const onRemoveAtCart = (id) => {
        console.log(id)
        axios.delete(`https://b94150688bd72cf4.mokky.dev/cartWheels/${id}`)
        setCartItems(prev => prev.filter(el => el.id !== id))
    }

    const onAddToFavorite = (obj) => {
        console.log(obj.id)
       try { if(favorites.find(object => object.id === obj.id)){
            axios.delete(`https://b94150688bd72cf4.mokky.dev/favorites/${obj.id}`)
            setFavorites(prev => prev.filter(el => el.id !== obj.id))
        } else{
            axios.post('https://b94150688bd72cf4.mokky.dev/favorites', obj).then(res => setFavorites(prev => [...prev, res.data]))
        }} catch(error) {
           alert('Произошла ошибка')
        }
    }

    

    const onChangeSearch = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId)===Number(id))
    }



    return (
        <>
        <AppContext.Provider value={{wheels, cartItems, favorites, isItemAdded, setDrawerIsOpened}}>
        
        <Header onClickCart={() => setDrawerIsOpened(true)}/>

        <Drawer  
        onRemoveClick={onRemoveAtCart}
        cartItems={cartItems} 
        handleCloseDrawer = {() => setDrawerIsOpened(false)}
        setCartItems={setCartItems} 
        opened={drawerIsOpened}
        />

        <Routes>
        <Route path='/' element={<Main 
        wheels={wheels}
        onChangeSearch={onChangeSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onAddToCart={onAddToCart}
        onAddToFavorite={onAddToFavorite}
        cartItems={cartItems}
        isLoading={!wheels.length}
        />} />

        <Route path='/favorites' element={<Favorites 
        favorites={favorites} 
        onAddToCart={onAddToCart} 
        onAddToFavorite={onAddToFavorite}
        isLoading={isLoading}
        />}  />

        <Route path='/orders' element={<Orders
        favorites={favorites} 
        onAddToCart={onAddToCart} 
        onAddToFavorite={onAddToFavorite}
        isLoading={isLoading}
        />} />
        
        </Routes>
        </AppContext.Provider>
        </>
    );
};

export default Assortiment;