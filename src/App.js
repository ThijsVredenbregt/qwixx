import React, {Component} from 'react';
import './App.css';
import MissedThrows from './MissedThrows'
import Scorrer from './Scorrer'
import Scoreboard from './Scoreboard'
import SideBar from "./Sidebar";
import './Sidebar.css';

class App extends Component {
	constructor(props) {
		super(props)

		let savedState = window.localStorage.getItem("state")
		if (savedState !== null) {
			this.state = JSON.parse(savedState)
		} else {
			this.state = this.getDefaultState()
		}

		window.localStorage.setItem("state", JSON.stringify(this.state))
	}

	getDefaultState () {
		return {
			red: [
				{id: "two", value:2, checked: false, disabled: false},{id: "three", value:3, checked: false, disabled: false},{id: "four", value:4, checked: false, disabled: false},
				{id: "five", value:5, checked: false, disabled: false},{id: "six", value:6, checked: false, disabled: false},{id: "seven", value:7, checked: false, disabled: false},
				{id: "aight", value:8, checked: false, disabled: false},{id: "nine", value:9, checked: false, disabled: false},{id: "ten", value:10, checked: false, disabled: false},
				{id: "eleven", value:11, checked: false, disabled: false},{id: "twelve", value:12, checked: false, disabled: true}
			],
			yellow: [
				{id: "two", value:2, checked: false, disabled: false},{id: "three", value:3, checked: false, disabled: false},{id: "four", value:4, checked: false, disabled: false},
				{id: "five", value:5, checked: false, disabled: false},{id: "six", value:6, checked: false, disabled: false},{id: "seven", value:7, checked: false, disabled: false},
				{id: "aight", value:8, checked: false, disabled: false},{id: "nine", value:9, checked: false, disabled: false},{id: "ten", value:10, checked: false, disabled: false},
				{id: "eleven", value:11, checked: false, disabled: false},{id: "twelve", value:12, checked: false, disabled: true}
			],
			green: [
				{id: "twelve", value:12, checked: false, disabled: false},{id: "eleven", value:11, checked: false, disabled: false},{id: "ten", value:10, checked: false, disabled: false},
				{id: "nine", value:9, checked: false, disabled: false},{id: "aight", value:8, checked: false, disabled: false},{id: "seven", value:7, checked: false, disabled: false},
				{id: "six", value:6, checked: false, disabled: false},{id: "five", value:5, checked: false, disabled: false},{id: "four", value:4, checked: false, disabled: false},
				{id: "three", value:3, checked: false, disabled: false},{id: "two", value:2, checked: false, disabled: true}
			],
			blue: [
				{id: "twelve", value:12, checked: false, disabled: false},{id: "eleven", value:11, checked: false, disabled: false},{id: "ten", value:10, checked: false, disabled: false},
				{id: "nine", value:9, checked: false, disabled: false},{id: "aight", value:8, checked: false, disabled: false},{id: "seven", value:7, checked: false, disabled: false},
				{id: "six", value:6, checked: false, disabled: false},{id: "five", value:5, checked: false, disabled: false},{id: "four", value:4, checked: false, disabled: false},
				{id: "three", value:3, checked: false, disabled: false},{id: "two", value:2, checked: false, disabled: true}
			],
			grey: [
				{id:1, checked:false},{id:2, checked:false},{id:3, checked:false},{id:4, checked:false}
			],
			scoreboard: {red:0,yellow:0,green:0,blue:0,grey:0},
			menu: {isOpen:false}
		}
	}

	handleMissedThrowOnClick = (event) => {
		let checkbox = event.target.dataset
		let items = this.state[checkbox.row]
		let checkedQty = 0;
		items.forEach(item => {
			if (item.id === Number(checkbox.id)) {
				item.checked = !item.checked
			}

			if (item.checked === true) {
				checkedQty++
			}
		})
		let scoreboard = this.state.scoreboard
	    scoreboard[checkbox.row] = checkedQty * 5
		this.setState({scoreboard: scoreboard})
		this.setState({[checkbox.row]: items})
	}

	handleScorrerOnClick = (event) => {
		let checkbox = event.target.dataset
		let items = this.state[checkbox.row]
		let checkedQty = 0;
		items.forEach(item => {
			if (item.value === Number(checkbox.value) && !item.disabled) {
				item.checked = !item.checked

				for (var i = (checkbox.index-1) ; i >= 0 ; i--) {
					items[i].disabled = true

					if (!item.checked) {
						items[i].disabled = false
						if (items[i].checked) {
							break;
						}
					}
				}
			}

			if (item.checked === true) {
				checkedQty++
			}
		})

		if (checkedQty < 5) {
			items[items.length-1].disabled = true
			items[items.length-1].checked = false
		} else {
			items[items.length-1].disabled = false
		}

		let scoreboard = this.state.scoreboard
	    scoreboard[checkbox.row] = (checkedQty*(checkedQty+1))/2
		this.setState({scoreboard: scoreboard})
		this.setState({[checkbox.row]: items})
	}

	componentDidUpdate() {
		window.localStorage.setItem("state", JSON.stringify(this.state))
	}

	handleOnClickReset = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState(this.getDefaultState())
	}

	handleMenuStateChange = (event) => {
		this.setState({menu: {isOpen: event.isOpen}})
	}

	render () {
		return (
			<div className="App" style={{flex:1, flexDirection: 'column', justifyContent:'space-evenly',display:'flex'}}>		
				<div style={{flex:1, flexDirection: 'row', justifyContent:'space-evenly',display:'flex'}}>
					<div style={{flex:1,display:'flex'}}>
						<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} isOpen={this.state.menu.isOpen} onMenuStateChange={this.handleMenuStateChange} onClickReset={this.handleOnClickReset} />
						<div id="page-wrap"></div>
					</div>
					<div style={{flex:1,display:'flex'}}>
						<MissedThrows row="grey" items={this.state.grey} onClickHandler={this.handleMissedThrowOnClick} />
					</div>
				</div>				
				<Scorrer row="red" lightColor="#ffe2e0" darkColor="darkred" color="red" items={this.state.red} onClickHandler={this.handleScorrerOnClick}/>
				<Scorrer row="yellow" lightColor="lightyellow" darkColor="#caca00" color="yellow" items={this.state.yellow} onClickHandler={this.handleScorrerOnClick} />
				<Scorrer row="green" lightColor="lightgreen" darkColor="darkgreen" color="green" items={this.state.green} onClickHandler={this.handleScorrerOnClick} />
				<Scorrer row="blue" lightColor="lightblue" darkColor="darkblue" color="blue" items={this.state.blue} onClickHandler={this.handleScorrerOnClick} />	
						    		    
		    	<Scoreboard red={this.state.scoreboard.red} yellow={this.state.scoreboard.yellow} green={this.state.scoreboard.green} blue={this.state.scoreboard.blue} grey={this.state.scoreboard.grey}/>
    		</div>
		);
	}
}

export default App;
