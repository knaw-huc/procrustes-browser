import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {useState, useEffect} from "react";
import {SERVICE_SERVER} from "../misc/config";
import {IBrowseResult} from "../misc/interfaces";
import {Base64} from "js-base64";

function Search(props: { datasetID: string }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IBrowseResult>({} as IBrowseResult);
    const [refresh, setRefresh] = useState(false);

    console.log(props.datasetID);

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    <h2>Dataset {props.datasetID}</h2>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search;