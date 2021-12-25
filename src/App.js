import React, {Component} from 'react';
import './App.css';
import SideBar from "./Sidebar";
import './Sidebar.css';
import Board from "./Board";

class App extends Component {
	constructor(props) {
		super(props)

		let savedState = window.localStorage.getItem("state")
		if (savedState !== null) {
			let json = JSON.parse(savedState);
			if (json.gamemode === undefined) {
				this.state = this.getDefaultState();
			} else {
				this.state = json;
			}
		} else {
			this.state = this.getDefaultState()
		}

		window.localStorage.setItem("state", JSON.stringify(this.state))
	}

	getDefaultState () {
		return {
			gamemode: "Classic",
			menu: {isOpen:false}
		}
	}

	componentDidUpdate() {
		window.localStorage.setItem("state", JSON.stringify(this.state))
	}

	handleOnClickReset = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState(this.getDefaultState())
		window.localStorage.setItem("state", JSON.stringify(this.state))
		window.localStorage.removeItem("gamemode.classic");
		window.localStorage.removeItem("gamemode.randomnumbers");
		window.localStorage.removeItem("gamemode.blackrow");
		window.localStorage.removeItem("gamemode.randomrowpart");
		window.localStorage.removeItem("gamemode.blacklink");
	}

	handleOnClickGamemodeClassic = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState({gamemode: "Classic"})
	}

	handleOnClickGamemodeBlackRow = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState({gamemode: "BlackRow"})
	}

	handleOnClickGamemodeRandomNumbers = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState({gamemode: "RandomNumbers"})
	}

	handleOnClickGamemodeBlackLink = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState({gamemode: "BlackLink"})
	}

	handleOnClickGamemodeRandomRowPart = (event) => {
		this.setState({menu: {isOpen: false}})
		this.setState({gamemode: "RandomRowPart"})
	}

	handleMenuStateChange = (event) => {
		this.setState({menu: {isOpen: event.isOpen}})
	}

	render () {
		return (
			<div className="App" style={{flex:1, flexDirection: 'column', justifyContent:'space-evenly',display:'flex'}}>
				<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} isOpen={this.state.menu.isOpen} onMenuStateChange={this.handleMenuStateChange}
						 onClickReset={this.handleOnClickReset}
						 onClickGamemodeClassic={this.handleOnClickGamemodeClassic}
						 onClickGamemodeBlackRow={this.handleOnClickGamemodeBlackRow}
						 onClickGamemodeRandomNumbers={this.handleOnClickGamemodeRandomNumbers}
						 onClickGamemodeBlackLink={this.handleOnClickGamemodeBlackLink}
						 onClickGamemodeRandomRowPart={this.handleOnClickGamemodeRandomRowPart}/>
				<Board gamemode={this.state.gamemode} />
			</div>
		);
	}
}

export default App;
