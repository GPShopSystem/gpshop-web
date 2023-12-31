import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import App from 'next/app'
import { wrapper } from '../redux/store'
import '../styles/index.scss'
import SidebarCart from '../components/SidebarCart'
import Layout from '../components/Layout'
import { Modal } from '@redq/reuse-modal';
import ButtonFloatingOrder from '../components/ButtonFloatingOrder'
import HeaderMobile from '../components/Layout/Header/HeaderMobile'
import ViewSidebar from '../components/Product/ViewSidebar'

const ProgressBar = dynamic(
	() => {
	  return import('../components/Progress')
	},
	{ ssr: false },
)
const Header = dynamic(
	() => {
	  return import('../components/Layout/Header/Header')
	},
	{ ssr: false },
)

const FloatingWhatsApp = dynamic(
	() => {
	  return import('react-floating-whatsapp')
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
					<title>Global Peruvian Shop (GPSHOP) - Artículos de limpieza - Perú</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				<ProgressBar />
				<header>
					<Header />
				</header>
				<Layout sidebar>
					<Component {...pageProps} />
				</Layout>
				<SidebarCart />
				<ButtonFloatingOrder />
				<HeaderMobile />
        		<Modal />
				<ViewSidebar />
				<FloatingWhatsApp 
					accountName='GPSHOP' 
					phoneNumber='51936257271'
					chatMessage='Hola! 🤝¿podemos ayudarte?' 
					placeholder='Escribe tu mensaje...'
					statusMessage='Normalmente la respuesta es de 13 minutos'
				/>
			</>
		)
	}
}

export default wrapper.withRedux(MyApp)