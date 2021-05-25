import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as generalActions from '../../redux/actions/general'
import { createDataTree } from '../../hooks/hooks'
import View from '../../components/Product/View';
import ProductCard from '../../components/Product/Card';
import Head from 'next/head'

export default function Index({ product, categories }) {
	const dispatch = useDispatch()
	const showButtonBack = typeof window !== 'undefined' && window.history.length > 2

	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])

	if(!product.id){
		return 'No existe este producto'
	}
	
	return (
		<>
			<Head>
				<title>{product.title} - GPShop.pe</title>
			</Head>
			<View product={product} showButtonBack={showButtonBack} />
			<h2>Tal vez te interese...</h2>
			<div className="productList" style={{marginTop: 20}}>
                {
                    ['', '', '', '', '', ''].map(e => <ProductCard key={e.id} data={{
						price: 12,
						original_price: 13
					}} />)
                }
            </div>
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
