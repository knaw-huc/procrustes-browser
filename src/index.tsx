import React from 'react';
import ReactDOM from 'react-dom';
import {interpret} from "xstate";
import {StateMachineComponent} from "./renderMachine";
import {BrowseMachine} from "./machine/model";
import Home from "./components/home";
import Metadata from "./components/metadata";
import Search from "./components/search";
import './assets/css/procrustus.css';
import reportWebVitals from './reportWebVitals';

const interpreter = interpret(BrowseMachine);
interpreter.start();

function gotoUrl() {
    if (window.location.hash.substr(1).indexOf("detail/") === 0) {
        const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
        interpreter.send("fourOhFour"); //Filthy solution for forcing props reload!!!
        interpreter.send("detail", {manuscript_id: id});
    } else {
        if (window.location.hash.substr(1).indexOf("search/") === 0) {
                const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
                interpreter.send("fourOhFour"); //Filthy solution for forcing props reload!!!
                interpreter.send("search", {dataset_id: id});
        } else {
            if (window.location.hash.substr(1).indexOf("metadata/") === 0) {
                const id = window.location.hash.substr(window.location.hash.indexOf("/") + 1);
                interpreter.send("fourOhFour"); //Filthy solution for forcing props reload!!!
                interpreter.send("metadata", {dataset_id: id});
            } else {
                interpreter.send("home");
            }

        }
    }
}

window.onhashchange = gotoUrl;


ReactDOM.render(
    <div>
        {StateMachineComponent(interpreter, {
            "home": ({state}) => <Home/>,
            "metadata": ({state}) => <Metadata datasetID={(state.context || {}).dataset_id}/>,
            "search": ({state}) => <Search datasetID={(state.context || {}).dataset_id}/>,
            "fourOhFour": ({state}) => <div>404</div>,
            "": ({state}) => <div>The GUI for {state.value} is not yet defined</div>
        })}</div>
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
