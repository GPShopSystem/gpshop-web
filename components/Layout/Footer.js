import React, { memo } from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

const Footer = ({ children }) => {
    return ( <footer className='footer'>
    <div className='l-footer'>
        <img src='https://i.postimg.cc/y62wcLBq/logo.png' alt='' />
        <p>
            Somos tus aliados en los momentos esenciales de la vida como la limpieza del hogar 🏠 con soluciones innovadoras💡 en limpieza para todos los peruanos.
        </p>
    </div>
    <ul className='r-footer'>
        <li>
            <h2>Redes sociales</h2>
            <ul className='box'>
                <li><a href='#'>Instragram</a></li>
                <li><a href='#'>Facebook</a></li>
            </ul>
        </li>
        <li className='features'>
        <h2>Link de interés</h2>
            <ul className='box'>
                <li><a href='#'>Blog</a></li>
                <li><a href='#'>Proveedores</a></li>
            </ul>
        </li>
        <li>
            <h2>Contáctanos</h2>
            <ul className='box'>
                <li><a href='#'>wjharil@gmail.com</a></li>
            </ul>
        </li>
    </ul>
    <div className='b-footer'>
        <p>Todos los derechos reservados ©Global Peruvian Shop {new Date().getFullYear()}</p>
    </div>
    </footer>);
}

export default Footer;