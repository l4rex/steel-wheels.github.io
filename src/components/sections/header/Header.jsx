import React, { useContext, useState } from 'react';
import styles from './Header.module.scss'
import {Link} from 'react-router-dom'

import logo from './../../../images/icons/icon-brake-gradient.png'
import basket from './../../../images/icons/ui/basket.svg'
import like from './../../../images/icons/ui/zmdi_favorite-outline.svg'
import union from './../../../images/icons/ui/Union.svg'
import { useCart } from '../../../hooks/useCart';



const Header = ({onClickCart}) => {

const {totalPrice} = useCart()
  
    return (
        <header className={styles.header}>
            
                <div className={styles.header__row}>
                    <div className={styles.header__title}>
                        <div className={styles.header__title__logo}>
                            <img width={40} src={logo} alt="" />
                        </div>
                        <div className={styles.header__title__title}>
                        <Link to='/'>
                            <h2>STEEL WHEELS</h2>
                            <p>Магазин лучших дисков</p>
                        </Link>    
                        </div>
                    </div>
                    <div className={styles.header__ui} >
                        <div className={styles.header__price} onClick={onClickCart}>
                            <img src={basket} alt=""/>
                            <span>{totalPrice} руб.</span>
                        </div>
                        <div className={styles.header__favorites}>
                            <Link to='/favorites'>
                            <img src={like} alt="" />
                            <span>Избранное</span>
                            </Link>
                        </div>
                        <div className={styles.header__profile}>
                            <Link to='/orders'>
                            <img src={union} alt="" />
                            <span>Профиль</span>
                            </Link>
                        </div>
                    </div>
                </div>
        </header>
    );
};

export default Header;