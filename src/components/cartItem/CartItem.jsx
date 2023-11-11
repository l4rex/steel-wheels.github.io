import React from 'react';
import './cartItem.scss'
import remove from './../../images/icons/ui/remove-btn.svg'

const CartItem = ({items, onRemoveClick}) => {
    return (
        <div className='cartItem'>
            <div className="cartItem__img">
                <img width={70} src={items.image} alt="" />
                <div className="cartItem__text">
                <p className='cartItem__title'>{items.title}</p>
                <p className='cartItem__model'>{items.model}</p>
                <p className='cartItem__price'>{items.price}</p>
            </div>
            </div>
            <div className="cartItem__remove-btn" >
                <button onClick={()=>onRemoveClick(items.id)}><img src={remove} alt="" /></button>
            </div>
        </div>
    );
};

export default CartItem;