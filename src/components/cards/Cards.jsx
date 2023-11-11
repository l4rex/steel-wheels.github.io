import React, { useContext, useState } from 'react';
import './cards.scss'
import ContentLoader from 'react-content-loader'
import AppContext from '../../context';

import favoriteNo from './../../images/icons/ui/like-btn-gray.svg'
import favoriteYes from './../../images/icons/ui/like-btn-red.svg'
import plus from './../../images/icons/ui/full-plus-btn.svg'
import okay from './../../images/icons/ui/full-okay-btn.svg'




const Cards = ({image, title, model, price, onPlusClick, onLikeClick, favorited, added = false, id, parentId, loading = true}) => {
   const {isItemAdded} = useContext(AppContext)
   const [isLiked, setIsLiked] = useState(favorited)
   const handleClickLike = () => {
   setIsLiked(!isLiked)
   onLikeClick({image, title, model, price, id, parentId})
}
   const handleClickPlus = () => {
   onPlusClick({image, title, model, price, id, parentId})
   }
    return (
        <div className="card">
    {loading ? <ContentLoader 
    speed={2}
    width={212}
    height={321}
    viewBox="0 0 212 321"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
     <rect x="28" y="178" rx="5" ry="5" width="152" height="43" /> 
    <rect x="30" y="230" rx="5" ry="5" width="88" height="24" /> 
    <rect x="30" y="277" rx="5" ry="5" width="93" height="31" /> 
    <rect x="145" y="274" rx="5" ry="5" width="38" height="33" /> 
    <rect x="25" y="30" rx="10" ry="10" width="161" height="130" />
  </ContentLoader>
  :
  <div className="card__content">
    {onLikeClick && 
    <button className='card__favorite-btn' onClick={handleClickLike}>
        <img src={isLiked ? favoriteYes : favoriteNo} alt="like"/>
    </button>}
    
 <div className="card__img">
    <img width={133} src={image} alt="wheelIMG" />
 </div>
 <div className="card__text">
    <span className='card__text__title'>{title}</span>
    <span className='card__text__model'>{model}</span>
 </div>
 <div className="card__add">
    <div className="card__price">
        <span className='card_price_price'>Цена:</span>
        <span>{price} руб.</span>
    </div>
    <div className="card__plus">
       {onPlusClick && 
       <button className='card__plus-btn' onClick={handleClickPlus}>
            <img
             src={isItemAdded(parentId) ? okay : plus} 
             alt="cartPush" />
        </button>} 
    </div>
 </div>
</div>
}      
        </div>
    );
};

export default Cards;