import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {HOME} from "../misc/config";

function Home() {

    function goToPage(address: string, datasetID: string) {
        window.location.href = HOME + "#" + address + "/" + datasetID;
    }

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    <h2>Timbuctoo datasets</h2>
                    <div className="resultShelfmark">Subset of delegates</div>
                    <div className="resultDescription">Test set for REPUBLIC</div>
                    <div className="dsOptions">
                        <div className="dsOption" onClick={() => {
                            goToPage('search', 'u33707283d426f900d4d33707283d426f900d4d0d__delegates')
                        }}>Browse data</div>
                        <div className="dsOption" onClick={() => {
                            goToPage('metadata', 'u33707283d426f900d4d33707283d426f900d4d0d__delegates')
                        }}>View metadata
                        </div>
                    </div>
                    <div className="resultShelfmark">Abbreviated delegates</div>
                    <div className="resultDescription">Excel sheet van Rik</div>
                    <div className="dsOptions">
                        <div className="dsOption" onClick={() => {
                            goToPage('search', 'u33707283d426f900d4d33707283d426f900d4d0d__abbreviated_delegates')
                        }}>Browse data</div>
                        <div className="dsOption" onClick={() => {
                            goToPage('metadata', 'u33707283d426f900d4d33707283d426f900d4d0d__abbreviated_delegates')
                        }}>View metadata
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}

export default Home;