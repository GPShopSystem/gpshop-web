import React, {useEffect} from 'react';
import TableOrder from '../components/TableOrder';
import Sticky from 'react-stickynode'
import Steps from '../containers/checkout'
import { useSelector, useDispatch } from 'react-redux'
import { createDataTree } from '../hooks/hooks'
import * as generalActions from '../redux/actions/general'
import useResponsive from '../hooks/responsive.ts'

export default function Index({categories}) {
    const currentStep = useSelector(state => state.checkout.currentStep)
    const dispatch = useDispatch()
    const responsive = useResponsive()
    const isMobile = responsive.md || responsive.sm

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
                        <Sticky enabled={!isMobile}  top={80} innerZ={999}>
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