import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import apiKey from './config.js';

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

// Redux
import { createStore, applyMiddleware, compose} from 'redux';
import reducers from "./reducers";
import { Provider } from 'react-redux';

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

const store = createStore(reducers, compose(devtools));

// Replace this with your project's endpoint
const GRAPHCMS_API = apiKey();

const client = new ApolloClient({
	link: new HttpLink({ uri: GRAPHCMS_API }),
	cache: new InMemoryCache()
})



ReactDOM.render(
	<ApolloProvider client={client} >
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
)
registerServiceWorker();