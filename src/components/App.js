import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
	constructor () {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples= this.loadSamples.bind(this);
		this.addToOrder= this.addToOrder.bind(this);
		this.updateFish= this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);

		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish) {
		// current state
		const fishes = { ...this.state.fishes };
		//add in new fish
		const timestamp =  Date.now();
		fishes[`fish-${timestamp}`] = fish;
		//set state
		this.setState({ fishes });
	}

	updateFish(key, updateFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updateFish;
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes });
	}

	loadSamples() {
		this.setState({ fishes: sampleFishes});
	}

	addToOrder(key) {
		const order = { ...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({ order });
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
			,{
				context: this,
				state: 'fishes'
		});

		// fetch order from localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState){
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh sea food market"/>
					<ul className="list-of-fishes">
						{Object
								.keys(this.state.fishes)
								.map(key =>
									<Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder}/>
								)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory
					loadSamples={this.loadSamples}
					addFish={this.addFish}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish} />
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
};

export default App;