import React, {Component} from 'react';
import MissedThrows from "./MissedThrows";
import Scorrer from "./Scorrer";
import Scoreboard from "./Scoreboard";
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = "gamemode.blacklink";

class BlackLinkBoard extends Component {

    constructor(props) {
        super(props)

        let savedState = window.localStorage.getItem(STORAGE_KEY)
        if (savedState !== null) {
            this.state = JSON.parse(savedState);
        } else {
            this.state = this.getDefaultState()
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));

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
        let states =  {
            red: [
                {id: uuidv4(), value:2, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:3, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:4, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:5, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:6, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:7, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:8, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:9, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:10, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:11, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:12, checked: false, disabled: true, link:undefined}
            ],
            yellow: [
                {id: uuidv4(), value:2, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:3, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:4, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:5, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:6, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:7, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:8, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:9, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:10, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:11, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:12, checked: false, disabled: true, link:undefined}
            ],
            green: [
                {id: uuidv4(), value:12, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:11, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:10, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:9, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:8, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:7, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:6, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:5, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:4, checked: false, disabled: false, link:undefined},
                {id: uuidv4(), value:3, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:2, checked: false, disabled: true, link:undefined}
            ],
            blue: [
                {id: uuidv4(), value:12, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:11, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:10, checked: false, disabled: false, reference: undefined, link:undefined},
                {id: uuidv4(), value:9, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:8, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:7, checked: false, disabled: false, reference: undefined, link:undefined},
                {id: uuidv4(), value:6, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:5, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:4, checked: false, disabled: false, reference: undefined, link:undefined},
                {id: uuidv4(), value:3, checked: false, disabled: false, link:undefined},{id: uuidv4(), value:2, checked: false, disabled: true, link:undefined}
            ],
            grey: [
                {id:1, checked:false},{id:2, checked:false},{id:3, checked:false},{id:4, checked:false}
            ],
            scoreboard: {red:0,yellow:0,green:0,blue:0,grey:0},
            gamemode: "blacklink"
        }

        states.yellow[1].link = states.green[1].id;
        states.green[1].link = states.yellow[1].id;

        states.blue[3].link = states.green[3].id;
        states.green[3].link = states.blue[3].id;

        states.red[4].link = states.yellow[4].id;
        states.yellow[4].link = states.red[4].id;

        states.green[6].link = states.yellow[6].id;
        states.yellow[6].link = states.green[6].id;

        states.blue[8].link = states.green[8].id;
        states.green[8].link = states.blue[8].id;

        states.yellow[9].link = states.red[9].id;
        states.red[9].link = states.yellow[9].id;

        return states;
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

    updateLinkedCheckbox(id) {
        let state = this.state;
        let scoreboard = this.state.scoreboard

        state.red.forEach(checkbox => {
            if (checkbox.id === id) {
                checkbox.checked = !checkbox.checked;
                for (let i = (state.red.length-1) ; i >= 0 ; i--) {
                    if (Number(state.red[i].value) < Number(checkbox.value)) {
                        state.red[i].disabled = true
                        if (!checkbox.checked && !checkbox.disabled) {
                            state.red[i].disabled = false
                            if (state.red[i].checked) {
                                break;
                            }
                        }
                    }
                }
            }
        });

        state.yellow.forEach(checkbox => {
            if (checkbox.id === id) {
                checkbox.checked = !checkbox.checked;
                for (let i = (state.yellow.length-1) ; i >= 0 ; i--) {
                    if (Number(state.yellow[i].value) < Number(checkbox.value)) {
                        state.yellow[i].disabled = true
                        if (!checkbox.checked && !checkbox.disabled) {
                            state.yellow[i].disabled = false
                            if (state.yellow[i].checked) {
                                break;
                            }
                        }
                    }
                }
            }
        });

        state.green.forEach(checkbox => {
            if (checkbox.id === id) {
                checkbox.checked = !checkbox.checked;
                for (let i = (state.green.length-1) ; i >= 0 ; i--) {
                    if (Number(state.green[i].value) > Number(checkbox.value)) {
                        state.green[i].disabled = true
                        if (!checkbox.checked && !checkbox.disabled) {
                            state.green[i].disabled = false
                            if (state.green[i].checked) {
                                break;
                            }
                        }
                    }
                }
            }
        });

        state.blue.forEach(checkbox => {
            if (checkbox.id === id) {
                checkbox.checked = !checkbox.checked;
                for (let i = (state.blue.length-1) ; i >= 0 ; i--) {
                    if (Number(state.blue[i].value) > Number(checkbox.value)) {
                        state.blue[i].disabled = true
                        if (!checkbox.checked && !checkbox.disabled) {
                            state.blue[i].disabled = false
                            if (state.blue[i].checked) {
                                break;
                            }
                        }
                    }
                }
            }
        });

        scoreboard["red"] = this.calculateScoreForRow(state.red);
        scoreboard["blue"] = this.calculateScoreForRow(state.blue);
        scoreboard["green"] = this.calculateScoreForRow(state.green);
        scoreboard["yellow"] = this.calculateScoreForRow(state.yellow);

        this.setState({scoreboard: scoreboard})

        state.red = this.calculateLastCheckboxStatus(state.red);
        state.yellow = this.calculateLastCheckboxStatus(state.yellow);
        state.green = this.calculateLastCheckboxStatus(state.green);
        state.blue = this.calculateLastCheckboxStatus(state.blue);

        this.setState(state);
    }

    calculateScoreForRow(row) {
        let checkedQty = 0;

        row.forEach(value => {
            if (value.checked) {
                checkedQty++;
            }
        })

        return (checkedQty*(checkedQty+1))/2;
    }

    calculateLastCheckboxStatus(row) {
        let checkedQty = 0;

        row.forEach(value => {
            if (value.checked) {
                checkedQty++;
            }
        })

        if (checkedQty < 5) {
            row[row.length-1].disabled = true
            row[row.length-1].checked = false
        } else {
            row[row.length-1].disabled = false
        }

        if (row[row.length-1].checked === true) {
            checkedQty++
        }

        return row;
    }

    handleScorrerOnClick(event) {
        let checkbox = event.target.dataset
        let items = this.state[checkbox.row]
        let checkedQty = 0;
        items.forEach(item => {
            if (item.value === Number(checkbox.value) && !item.disabled) {
                item.checked = !item.checked
                if (item.link !== undefined) {
                    this.updateLinkedCheckbox(item.link);
                }

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

        if (items[items.length-1].checked === true) {
            checkedQty++
        }

        let scoreboard = this.state.scoreboard
        scoreboard[checkbox.row] = (checkedQty*(checkedQty+1))/2
        this.setState({scoreboard: scoreboard})
        this.setState({[checkbox.row]: items})
    }

    render() {
        return(
            <React.Fragment>
                <MissedThrows row="grey" items={this.state.grey} onClickHandler={this.handleMissedThrowOnClick} />
                <Scorrer row="red" lightColor="#ffe2e0" darkColor="darkred" color="red" items={this.state.red} onClickHandler={this.handleScorrerOnClick}/>
                <Scorrer row="yellow" lightColor="lightyellow" darkColor="#caca00" color="yellow" items={this.state.yellow} onClickHandler={this.handleScorrerOnClick} />
                <Scorrer row="green" lightColor="lightgreen" darkColor="darkgreen" color="green" items={this.state.green} onClickHandler={this.handleScorrerOnClick} />
                <Scorrer row="blue" lightColor="lightblue" darkColor="darkblue" color="blue" items={this.state.blue} onClickHandler={this.handleScorrerOnClick} />

                <Scoreboard red={this.state.scoreboard.red} yellow={this.state.scoreboard.yellow} green={this.state.scoreboard.green} blue={this.state.scoreboard.blue} grey={this.state.scoreboard.grey}/>
            </React.Fragment>
        );
    }
}

export default BlackLinkBoard;