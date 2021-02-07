import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../components/Product/Card';
import { useDispatch } from 'react-redux'
import * as generalActions from '../redux/actions/general'
import { createDataTree } from '../hooks/hooks'

export default function Index({ products, categories }) {
    const dispatch = useDispatch()
    const router = useRouter();
	const { query } = router;

	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])

	if(query.category === 'marcas') {
		// render if category is marcas
		return (
			<div>
				Listar marcas
			</div>
		)
	}

	return (
		<>
			<p>
				Se encontraron <b>{products.length}</b> productos que coinciden con: <b>{query.category}</b>
			</p>
            
            <div className="productList">
                {
                    products.map(e => <ProductCard key={e.id} data={e} />)
                }
            </div>
		</>
	)
}

export async function getServerSideProps({query}) {
	const resProducts = await fetch(
		process.env.URL_BASE + '/api/products?category='+query.category
	)
	const json = await resProducts.json()
	
	const resCategory = await fetch(
		process.env.URL_BASE +'/api/category'
	)
	const jsonCategory = await resCategory.json()

	return {
		props: {
			products: json.data,
			categories: createDataTree(jsonCategory.data)
		},
	}
}
