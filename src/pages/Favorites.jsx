import React from 'react';
import Cards from '../components/cards/Cards';

const Favorites = ({favorites, onAddToCart, onAddToFavorite, isLoading}) => {
    return (
        <section className='assortiment'>
            <div className="assortiment__content">
                <div className="assortiment__title">
                    <h2>Избранное</h2>
                    </div>
                </div>

                <div className="assortiment__cards">
                
                { (isLoading ? [...Array(8)] : favorites)
                .map((el, i) => 
                    <Cards 
                    key={i} 
                
                onPlusClick = {onAddToCart}
                onLikeClick={onAddToFavorite}
                favorited={true}
                loading={isLoading}
                {...el}
                    />
                )}
                
                </div>              
        </section>
    );
};

export default Favorites;