import React, {Component} from 'react';
import MissedThrows from "./MissedThrows";
import Scorrer from "./Scorrer";
import Scoreboard from "./Scoreboard";

const STORAGE_KEY = "gamemode.blackrow";

class BlackRowBoard extends Component {

    constructor(props) {
        super(props)

        let savedState = window.localStorage.getItem(STORAGE_KEY)
        if (savedState !== null) {
            this.state = JSON.parse(savedState);
        } else {
            this.state = this.getDefaultState()
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))

        this.handleMissedThrowOnClick = this.handleMissedThrowOnClick.bind(this);
        this.handleScorrerOnClick = this.handleScorrerOnClick.bind(this);
    }

    componentDidUpdate() {
        if (window.localStorage.getItem(STORAGE_KEY) === null
            && this.state !== this.getDefaultState) {
            this.setState(this.getDefaultState());
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    }

    getDefaultState () {
        return {
            red: [
                {id: "two", value:2, checked: false, disabled: false, blacked: true},{id: "three", value:3, checked: false, disabled: false, blacked: false},{id: "four", value:4, checked: false, disabled: false, blacked: false},
                {id: "five", value:5, checked: false, disabled: false, blacked: false},{id: "six", value:6, checked: false, disabled: false, blacked: false},{id: "seven", value:7, checked: false, disabled: false, blacked: false},
                {id: "aight", value:8, checked: false, disabled: false, blacked: true},{id: "nine", value:9, checked: false, disabled: false, blacked: false},{id: "ten", value:10, checked: false, disabled: false, blacked: false},
                {id: "eleven", value:11, checked: false, disabled: false, blacked: false},{id: "twelve", value:12, checked: false, disabled: true, blacked: false}
            ],
            yellow: [
                {id: "two", value:2, checked: false, disabled: false, blacked: false},{id: "three", value:3, checked: false, disabled: false, blacked: true},{id: "four", value:4, checked: false, disabled: false, blacked: false},
                {id: "five", value:5, checked: false, disabled: false, blacked: false},{id: "six", value:6, checked: false, disabled: false, blacked: false},{id: "seven", value:7, checked: false, disabled: false, blacked: true},
                {id: "aight", value:8, checked: false, disabled: false, blacked: false},{id: "nine", value:9, checked: false, disabled: false, blacked: true},{id: "ten", value:10, checked: false, disabled: false, blacked: false},
                {id: "eleven", value:11, checked: false, disabled: false, blacked: false},{id: "twelve", value:12, checked: false, disabled: true, blacked: false}
            ],
            green: [
                {id: "twelve", value:12, checked: false, disabled: false, blacked: false},{id: "eleven", value:11, checked: false, disabled: false, blacked: false},{id: "ten", value:10, checked: false, disabled: false, blacked: true},
                {id: "nine", value:9, checked: false, disabled: false, blacked: false},{id: "aight", value:8, checked: false, disabled: false, blacked: true},{id: "seven", value:7, checked: false, disabled: false, blacked: false},
                {id: "six", value:6, checked: false, disabled: false, blacked: false},{id: "five", value:5, checked: false, disabled: false, blacked: false},{id: "four", value:4, checked: false, disabled: false, blacked: true},
                {id: "three", value:3, checked: false, disabled: false, blacked: false},{id: "two", value:2, checked: false, disabled: true, blacked: true}
            ],
            blue: [
                {id: "twelve", value:12, checked: false, disabled: false, blacked: false},{id: "eleven", value:11, checked: false, disabled: false, blacked: false},{id: "ten", value:10, checked: false, disabled: false, blacked: false},
                {id: "nine", value:9, checked: false, disabled: false, blacked: true},{id: "aight", value:8, checked: false, disabled: false, blacked: false},{id: "seven", value:7, checked: false, disabled: false, blacked: false},
                {id: "six", value:6, checked: false, disabled: false, blacked: false},{id: "five", value:5, checked: false, disabled: false, blacked: false},{id: "four", value:4, checked: false, disabled: false, blacked: false},
                {id: "three", value:3, checked: false, disabled: false, blacked: true},{id: "two", value:2, checked: false, disabled: true, blacked: false}
            ],
            grey: [
                {id:1, checked:false},{id:2, checked:false},{id:3, checked:false},{id:4, checked:false}
            ],
            scoreboard: {red:0,yellow:0,green:0,blue:0,black:0,grey:0},
            gamemode: "blackrow"
        }
    }

    handleMissedThrowOnClick(event) {
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

    getBlackCheckedQty() {
        let checkedQty = 0;
        this.state.red.forEach(item => {
            if(item.blacked === true
                && item.checked === true) {
                checkedQty++;
            }
        })

        this.state.yellow.forEach(item => {
            if(item.blacked === true
                && item.checked === true) {
                checkedQty++;
            }
        })

        this.state.green.forEach(item => {
            if(item.blacked === true
                && item.checked === true) {
                checkedQty++;
            }
        })

        this.state.blue.forEach(item => {
            if(item.blacked === true
                && item.checked === true) {
                checkedQty++;
            }
        })

        return checkedQty;
    }

    handleScorrerOnClick(event) {
        let checkbox = event.currentTarget.dataset;
        let items = this.state[checkbox.row];
        let checkedQty = 0;
        items.forEach(item => {
            if (item.value === Number(checkbox.value) && !item.disabled) {
                item.checked = !item.checked;

                for (let i = (checkbox.index-1) ; i >= 0 ; i--) {
                    items[i].disabled = true;

                    if (!item.checked) {
                        items[i].disabled = false;
                        if (items[i].checked) {
                            break;
                        }
                    }
                }
            }

            if (item.checked === true) {
                checkedQty++;
            }
        })

        if (checkedQty < 5) {
            items[items.length-1].disabled = true;
            items[items.length-1].checked = false;
        } else {
            items[items.length-1].disabled = false;
        }

        if (items[items.length-1].checked === true) {
            checkedQty++
        }
        let blackCheckedQty = this.getBlackCheckedQty();

        let scoreboard = this.state.scoreboard;
        scoreboard[checkbox.row] = (checkedQty*(checkedQty+1))/2;
        scoreboard.black = (blackCheckedQty*(blackCheckedQty+1))/2
        this.setState({scoreboard: scoreboard});
        this.setState({[checkbox.row]: items});
    }

    render() {
        return(
            <React.Fragment>
                <MissedThrows row="grey" items={this.state.grey} onClickHandler={this.handleMissedThrowOnClick} />
                <Scorrer row="red" lightColor="#ffe2e0" darkColor="darkred" color="red" items={this.state.red} onClickHandler={this.handleScorrerOnClick}/>
                <Scorrer row="yellow" lightColor="lightyellow" darkColor="#caca00" color="yellow" items={this.state.yellow} onClickHandler={this.handleScorrerOnClick} />
                <Scorrer row="green" lightColor="lightgreen" darkColor="darkgreen" color="green" items={this.state.green} onClickHandler={this.handleScorrerOnClick} />
                <Scorrer row="blue" lightColor="lightblue" darkColor="darkblue" color="blue" items={this.state.blue} onClickHandler={this.handleScorrerOnClick} />
                <Scoreboard red={this.state.scoreboard.red} yellow={this.state.scoreboard.yellow} green={this.state.scoreboard.green} blue={this.state.scoreboard.blue} black={this.state.scoreboard.black} grey={this.state.scoreboard.grey}/>
            </React.Fragment>
        );
    }
}

export default BlackRowBoard;