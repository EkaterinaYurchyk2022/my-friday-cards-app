import React from 'react';
import loader from '../../assets/preloader.gif';

export const Preloader = () =>
    <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%', zIndex: 999 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loader} alt={'preloader'} />
        </div>
    </div>;

