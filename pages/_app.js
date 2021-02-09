import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import App from 'next/app'
import { wrapper } from '../redux/store'
import '../styles/index.scss'
import Header from '../components/Layout/Header/Header'
import SidebarCart from '../components/SidebarCart'
import Layout from '../components/Layout'
import { Modal } from '@redq/reuse-modal';

const ProgressBar = dynamic(
	() => {
	  return import('../components/progressBar')
	},
	{ ssr: false },
)

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		}
	}

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
		}
	}

	render() {
		const { Component, pageProps } = this.props
		return (
			<>
				<Head>
					<title>GPSHOP</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				<ProgressBar />
				<Header />
					<Layout sidebar>
						<Component {...pageProps} />
					</Layout>
					<SidebarCart />
        		<Modal />
			</>
		)
	}
}

export default wrapper.withRedux(MyApp)