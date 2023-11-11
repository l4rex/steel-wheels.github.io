import React from 'react';

import removeInput from "../images/icons/ui/remove-btn.svg"
import lopa from '../images/icons/ui/Vector_loopa.svg'
import Cards from './../components/cards/Cards';

const Main = ({wheels, searchValue, onChangeSearch, onAddToCart, setSearchValue, onAddToFavorite, cartItems, isLoading}) => {

    const renderWheels = () => {
        const filteredItems = wheels.filter(el =>
            el.title.toLowerCase().includes(searchValue.toLowerCase()))
        return(isLoading ? [...Array(12)] : filteredItems).map((el, i) => 
                <Cards 
            key={i} 
            onPlusClick = {onAddToCart}
            onLikeClick={onAddToFavorite}
            loading={isLoading}
            {...el}
                />
                
            )
    };

    return (
        <section className='assortiment'>
            <div className="assortiment__content">
                <div className="assortiment__title">
                    <h2>Все колеса</h2>
                    <div className="assortiment__search">
                        <label>
                            <img src={lopa} alt="" />
                            <input onChange={onChangeSearch} value={searchValue} type="text" placeholder='Поиск...'/>
                            {searchValue && <button onClick={() => setSearchValue('')}><img width={20} src={removeInput} alt="clear" /></button>}
                        </label>
                    </div>
                </div>
                
                <div className="assortiment__cards">
                {renderWheels()}
                </div>              
            </div>
        </section>
    );
};

export default Main;