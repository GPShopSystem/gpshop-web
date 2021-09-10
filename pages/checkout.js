import React, {useEffect} from 'react';
import TableOrder from '../components/TableOrder';
import Sticky from 'react-stickynode'
import Steps from '../containers/checkout'
import { useSelector, useDispatch } from 'react-redux'
import { createDataTree } from '../hooks/hooks'
import * as generalActions from '../redux/actions/general'

export default function Index({categories}) {
    const currentStep = useSelector(state => state.checkout.currentStep)
    const dispatch = useDispatch()

	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])

    return (
        <div className="pageCheckout">
            <div className="pageCheckout-item pageCheckout-information boxBorder">
                <Steps />
            </div>
            
            {
                currentStep !== 4 && ( // ty-page
                    <div className="pageCheckout-item ">
                        <Sticky top={120} innerZ={999}>
                            <div className="widgetOrder boxBorder">
                                <h3>Resúmen del pedido</h3>
                                <TableOrder showTotalProducts/>
                            </div>
                        </Sticky>
                    </div>
                )
            }
            
        </div>
	)
}

export async function getServerSideProps() {
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