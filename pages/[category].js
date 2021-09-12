import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../components/Product/Card';
import { useDispatch } from 'react-redux'
import * as generalActions from '../redux/actions/general'
import { createDataTree } from '../hooks/hooks'

export default function Index({ categories }) {
    const dispatch = useDispatch()
    const router = useRouter();
	const { query } = router;

	const [products, setProducts] = useState([])
	const [loadingProducts, setLoadingProducts] = useState(true)
	const resProducts = async () => {
		const getList = await fetch(
			process.env.NEXT_PUBLIC_URL_BASE + '/api/products?category=' + query.category
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

	if(query.category === 'marcas') {
		// render if category is marcas
		return (
			<div>
				Listar marcas
			</div>
		)
	}

	const renderProducts = () => {
		if(loadingProducts) {
			return Array.from(Array(10).keys()).map(e => <div key={e} className="productCard_skeleton"></div>)
		}
		return products.map(e => <ProductCard key={e.id} data={e} />)
	}

	return (
		<>
			<p>
				Se encontraron <b>{products.length}</b> productos que coinciden con: <b>{query.category}</b>
			</p>
            
            <div className="productList">
                {
                    renderProducts()
                }
            </div>
		</>
	)
}

export async function getServerSideProps() {
	const resCategory = await fetch(
		process.env.URL_BASE +'/api/category'
	)
	const jsonCategory = await resCategory.json()

	return {
		props: {
			categories: createDataTree(jsonCategory.data)
		},
	}
}
