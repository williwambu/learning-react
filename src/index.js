// let's go!
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import { render } from 'react-dom';

import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound'
import './css/style.css';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={StorePicker}/>
				<Match exactly pattern="/store/:storeId" component={App}/>
				<Miss component={NotFound}/>
			</div>
		</BrowserRouter>
	)
};

render(<Root/>, document.querySelector('#main'));