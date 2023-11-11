import React, { useContext } from 'react';
import AppContext from '../../context';
import backArrow from '../../images/icons/ui/Back-arrow.svg'

const Info = ({title, description, img}) => {
    const {setDrawerIsOpened} = useContext(AppContext)
    return (
        <div className="empty__drawer">
                    <img src={img} alt="" />
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <button onClick={()=>setDrawerIsOpened(false)}><img width={13} src={backArrow} alt="" />Вернуться назад</button>
                </div>
    );
};

export default Info;