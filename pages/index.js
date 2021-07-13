import React, { useEffect } from 'react';
import ProductCard from '../components/Product/Card';
import { useDispatch } from 'react-redux'
import * as generalActions from '../redux/actions/general'
import { createDataTree } from '../hooks/hooks'
import Head from 'next/head'

export default function Index({ products, categories }) {
    const dispatch = useDispatch()

	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])

	return (
		<>
			<Head>
				<title>Global Peruvian Shop (GPSHOP) - Artículos de limpieza</title>
			</Head>
			<div style={{marginBottom:15}}>
				<img src="/static/banner-home/general.png" width="100%" />
			</div>
			<div className="productList">
				{
					products.map(e => <ProductCard key={e.id} data={e} />)
				}
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const resProducts = await fetch(
		process.env.URL_BASE + '/api/products/'
	)
	const json = await resProducts.json()
	
	const resCategory = await fetch(
		process.env.URL_BASE + '/api/category'
	)
	const jsonCategory = await resCategory.json()
		
	return {
		props: {
			products: json.data,
			categories: createDataTree(jsonCategory.data)
		},
	}
}
