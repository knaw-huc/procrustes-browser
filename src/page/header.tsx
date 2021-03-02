import React from "react";
import {HOME} from "../misc/config";
import logo from "../assets/images/logo.png";


export default class Header extends React.Component {

    goHome() {
        window.location.href = HOME;
    }

    render() {
        return (
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom5">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo" onClick={() => {this.goHome()}}>
                            <img src={logo} className="logo" alt="Logo Soundtolls"/>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}