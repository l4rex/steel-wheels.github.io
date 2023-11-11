import React, { useState } from 'react';
import './drawer.scss'
import axios from 'axios';

import CartItem from '../cartItem/CartItem';
import closeDrawer from './../../images/icons/ui/cross-for-btn.svg'
import korobka from './../../images/icons/ui/korobka.jpg'
import completeOrder from './../../images/icons/ui/order-completed.jpg'
import Info from '../info/Info';
import { useCart } from '../../hooks/useCart';

const delay = (ms) => new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
})

const Drawer = ({handleCloseDrawer, cartItems, onRemoveClick, setCartItems, opened}) => {

    const {totalPrice} = useCart()
    const [orderId, setOrderId] = useState(null)
    const [isOrderCompleted, setIsOrderComplete] = useState(false)

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('https://b94150688bd72cf4.mokky.dev/orders', {
                items: cartItems,
            })
            console.log(data)
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([]) 

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://b94150688bd72cf4.mokky.dev/cartWheels/${item.id}`, [])
                await delay(1000)
            }
            

            
        } catch (error) {
            alert('не удалось создать заказ' + error)
            console.error(error)
        } 
    }




    return (
        <div className={`drawer ${opened ? 'drawerVisible' : ''}`}>
            <div className='drawer__content'>
            <div className="drawer__and__remove-btn">
            <h2>Корзина</h2>
            <button onClick={handleCloseDrawer}><img src={closeDrawer} alt="" /></button>
            </div>
            {cartItems.length > 0?  
            <>
            <div className="drawer__content__items">
               {cartItems.map((el) => 
                   <CartItem 
                   key={el.model} 
                   items={el} 
                   onRemoveClick={onRemoveClick}/>
               )}
           </div>
           <div className="cartItem__totalPrice">
               <div className="totalPrice__total">
                   <span>Налог: </span>
                   <div></div>
                   <b>{totalPrice / 100 * 5} руб.</b>
               </div>
               <div className="totalPrice__total">
                   <span>Цена: </span>
                   <div></div>
                   <b>{totalPrice} руб.</b>
               </div>
               <button onClick={onClickOrder}>Оформить заказ</button>
           </div> 
           </>
            : 
            (isOrderCompleted ? 
                <Info 
            title='Заказ оформлен!'
            description={`Ваш заказ #${orderId} скоро будет передан курьерской доставке`}
            img={completeOrder}
            />
                :
                <Info 
            title='Внимание!'
            description='Добавьте хотя бы один комплект дисков, чтобы оформить заказ.'
            img={korobka}
            />
            )
        }   
                
            </div>
        </div>
    );
};

export default Drawer;