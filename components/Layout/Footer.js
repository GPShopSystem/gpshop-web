import React, { memo } from 'react';

const Footer = () => {
    return ( <footer className='footer'>
      <div className='l-footer'>
          <p>
              Somos tus aliados en los momentos esenciales de la vida como la limpieza del hogar 🏠 con soluciones innovadoras💡 en limpieza para todos los peruanos.
          </p>

          <p><b>¿Eres distribuidor?</b> Escríbenos a contacto@gpshop.pe</p>
      </div>
      <ul className='r-footer'>
          <li>
              <h2>Redes sociales</h2>
              <ul className='box'>
                  <li><a href='https://www.instagram.com/gpshop_pe/' target='_blank'>Instagram</a></li>
                  <li><a href='https://www.facebook.com/globalperuvianshop' target='_blank'>Facebook</a></li>
                  <li><a href='https://www.tiktok.com/@gpshop_pe' target='_blank'>TikTok</a></li>
              </ul>
          </li>
          {/*<li className='features'>
            <h2>Link de interés</h2>
              <ul className='box'>
                  <li><a href='mail:contacto@gpshop.pe'>Proveedores</a></li>
              </ul>
  </li>*/}
          <li className='features'>
              <h2>Contáctanos</h2>
              <ul className='box'>
                  <li>Av. 25 de Enero Mz B. Lt. 12 - SMP - Lima</li>
                  <li><a href='mail:contacto@gpshop.pe'>contacto@gpshop.pe</a></li>
                  <li><a href='tel:+51936257271'> +51 936 257 271</a></li>
              </ul>
          </li>
      </ul>
      <div className='b-footer'>
        <div>
        <iframe title="test" src="https://maps.google.com/maps?q=global%20peruvian%20shop&t=&z=15&ie=UTF8&iwloc=&output=embed" class="maps" style={{border: 0}}></iframe>

        </div>
          <p>Todos los derechos reservados © Global Peruvian Shop {new Date().getFullYear()}</p>
          <p style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <span>Con la tecnología de</span>
            <a style={{marginLeft: 5}} href='https://karpa.app/?from=gpshop' target='_blank'><img width={70} alt='Crea tu tienda virtual gratis' src='https://karpa.app/storage/logo/karpa_logo.png'/></a></p>
      </div>
    </footer>);
}

export default Footer;