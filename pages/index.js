import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Product/Card';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux'
import * as generalActions from '../redux/actions/general'
import { createDataTree } from '../hooks/hooks'
import Head from 'next/head'
Modal.setAppElement('#__next');

export default function Index({ categories }) {
  const dispatch = useDispatch()
	const [products, setProducts] = useState([])
	const [loadingProducts, setLoadingProducts] = useState(true)
	const [modalInit, setModalInit] = useState(false)
	const resProducts = async () => {
		const getList = await fetch(
			process.env.NEXT_PUBLIC_URL_BASE + '/api/products/'
		)
		const json = await getList.json()
		setProducts(json.data)
		setLoadingProducts(false);
	} 

	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])

	useEffect(() => {
    setModalInit(localStorage.getItem('modalInit') ? false : true);
		resProducts();
	},[])

	const renderProducts = () => {
		if(loadingProducts) {
			return Array.from(Array(5).keys()).map(e => <div key={e} className="productCard_skeleton"></div>)
		}
		return products.map(e => <ProductCard key={e.id} data={e} />)
	}

	return (
		<>
			<Head>
				<title>Global Peruvian Shop (GPSHOP) - Artículos de limpieza - Perú</title>
        <meta name="description" content="Somos una empresa comercializadora e importadora de artículos de limpieza con envíos a todo el Perú. Distruidores de marcas como Hude, Prolimso, Virutex, Dayr, Daryza y muchas más."/>
        <meta name="keywords" content="hude, dayr, prolimso, proveedor de artículos de limpieza, gpshop"/>
        <meta name="robots" content="index"/>
			</Head>
			<div style={{marginBottom:15}}>
        <a target='_blank' href='https://api.whatsapp.com/send?phone=51940147037&text=Hola,%20quisiera%20una%20cotizaci%C3%B3n%20de%20los%20siguientes%20productos:%0A%0A%E2%9E%A1%EF%B8%8F%20Palos%20forrados%20importados'>
				  <img src="/static/banner-home/palos.png" width="100%" />
        </a>
			</div>
			<div className="productList">
				{
					renderProducts()
				}
			</div>
      <Modal
        style={
          {
            overlay: {
              zIndex: 999999
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }
        }
        isOpen={modalInit}
      >
        <h4>Crea tu cotización en 3 pasos.</h4>
        <ul className='modalInitUl'>
          <li>Elige los productos que quieras.</li>
          <li>Revisa tus productos seleccionados.</li>
          <li>Envía tu cotización por WhatsApp.</li>
        </ul>
        <div className='sidebarCart-cart-total a text-center'>
          <a href='./' onClick={(e) =>{
            e.preventDefault();
            localStorage.setItem('modalInit', false);
            setModalInit(false);
          }}>¡De acuerdo!</a>
        </div>
      </Modal>
		</>
	)
}

export async function getStaticProps() {
	const resCategory = await fetch(
		process.env.URL_BASE + '/api/category'
	)
	const jsonCategory = await resCategory.json()
		
	return {
		props: {
			categories: createDataTree(jsonCategory.data)
		},
	}
}
