import React, { useEffect, useState } from 'react';
import Cards from '../components/cards/Cards';
import axios from 'axios';

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        (async() => {
            try {
                const {data} = await axios.get('https://b94150688bd72cf4.mokky.dev/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('ошибка ' + error)
            }
            
            
        })()
    }, [])

    return (
        <section className='assortiment'>
            <div className="assortiment__content">
                <div className="assortiment__title">
                    <h2>Мои заказы</h2>
                    </div>
                </div>

                <div className="assortiment__cards">
                {(isLoading ? [...Array(8)] : orders).map((el, i) => 
                    <Cards 
                    key={i}
                    loading={isLoading}
                    {...el}
                    />
                )}
                </div>              
        </section>
    );
};

export default Orders;