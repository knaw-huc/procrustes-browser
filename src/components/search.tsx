import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {useState, useEffect} from "react";
import {SERVICE_SERVER} from "../misc/config";
import {IBrowseResult} from "../misc/interfaces";
import {Base64} from "js-base64";

function Search(props: { search_string: string }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IBrowseResult>({} as IBrowseResult);
    const [refresh, setRefresh] = useState(false);

    function fetchData() {

    }

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    <h2></h2>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search;