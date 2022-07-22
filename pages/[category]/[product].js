import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import * as generalActions from '../../redux/actions/general'
import { createDataTree } from '../../hooks/hooks'
import View from '../../components/Product/View';
import ProductCard from '../../components/Product/Card';
import Head from 'next/head'

export default function Index({ product, categories }) {
	const dispatch = useDispatch()
	const [products, setProducts] = useState([])
	const [loadingProducts, setLoadingProducts] = useState(true)
	const [showRelated, setShowRelated] = useState(true)
	const showButtonBack = typeof window !== 'undefined' && window.history.length > 2
	const resProducts = async () => {
		const getList = await fetch(
			process.env.NEXT_PUBLIC_URL_BASE + '/api/products/related?id=' + product.category_id
		)
		const json = await getList.json()
		const listProducts = json.data.filter(e => e.id !== product.id);
		setProducts(listProducts)
		setLoadingProducts(false);
		setShowRelated(listProducts.length !== 0);
	} 

	useEffect(() => {
		resProducts();
	},[])

	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])

	if(!product.id){
		return 'No existe este producto'
	}

	const renderProducts = () => {
		if(loadingProducts) {
			return Array.from(Array(5).keys()).map(e => <div key={e} className="productCard_skeleton"></div>)
		}
		return products.map(e => <ProductCard key={e.id} data={e} />)
	}
	
	return (
		<>
			<Head>
				<title>{product.title} - GPShop.pe</title>
        <meta name="description" content={`${product.title}: Envíos a todo el Perú - Cotiza por internet de manera segura con GPSHOP`}/>
			</Head>
			<View product={product} showButtonBack={showButtonBack} />
			{
				showRelated && (
					<>
						<h2>Tal vez te interese...</h2>
						<div className="productList" style={{marginTop: 20}}>
							{
								renderProducts()
							}
						</div>
					</>
				)
			}
		</>
	)
}

export async function getServerSideProps({ query }) {
	const resProducts = await fetch(
		process.env.URL_BASE + '/api/products/'+query.product
	)
	const json = await resProducts.json()
	
	const resCategory = await fetch(
		process.env.URL_BASE + '/api/category'
	)
	const jsonCategory = await resCategory.json()

	return {
		props: {
			product: json.data,
			categories: createDataTree(jsonCategory.data)
		},
	}
}
