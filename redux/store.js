import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createWrapper } from 'next-redux-wrapper'
import reducers from './reducers/index'

const middlewares = []

middlewares.push(thunk)

const composeEnhancers = composeWithDevTools({})

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
))

const makeStore = () => store

export const wrapper = createWrapper(makeStore)