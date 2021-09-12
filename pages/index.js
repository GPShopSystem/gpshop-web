import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Product/Card';
import { useDispatch } from 'react-redux'
import * as generalActions from '../redux/actions/general'
import { createDataTree } from '../hooks/hooks'
import Head from 'next/head'

export default function Index({ categories }) {
    const dispatch = useDispatch()
	const [products, setProducts] = useState([])
	const [loadingProducts, setLoadingProducts] = useState(true)
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
		resProducts();
	},[])

	const renderProducts = () => {
		if(loadingProducts) {
			return Array.from(Array(10).keys()).map(e => <div key={e} className="productCard_skeleton"></div>)
		}
		return products.map(e => <ProductCard key={e.id} data={e} />)
	}

	return (
		<>
			<Head>
				<title>Global Peruvian Shop (GPSHOP) - Artículos de limpieza</title>
			</Head>
			<div style={{marginBottom:15}}>
				<img src="/static/banner-home/cover.png" width="100%" />
			</div>
			<div className="productList">
				{
					renderProducts()
				}
			</div>
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
