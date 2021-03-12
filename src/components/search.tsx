import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {useState, useEffect} from "react";
import {HOME, SERVICE_SERVER, TIMBUCTOO_DATASET} from "../misc/config";
import {IBrowseResult} from "../misc/interfaces";
import wrench from "../assets/images/wrench32.png";
import doc from "../assets/images/linedpaper32.png";
import back from "../assets/images/leftarrow32.png";
import {Base64} from "js-base64";

function Search(props: { datasetID: string }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IBrowseResult>({} as IBrowseResult);
    const [refresh, setRefresh] = useState(false);
    const [extendedView, setExtendedView] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState<number[]>([]);

    async function fetchData() {
        const url = SERVICE_SERVER + "elastic/browse/" + props.datasetID + "/" + page.toString();
        const response = await fetch(url);
        const json: IBrowseResult = await response.json();
        setPages(createPages(json));
        setResult(json);
        setLoading(false);
    }

    function createPages(json: IBrowseResult) {
        let arr: number[] = [];
        for (var i:number = 1; i<= json.total_pages; i++) {
            arr.push(i);
        }
        return arr;
    }

    function getDetail(uri: string) {
        const item_id = {dataset: props.datasetID, uri: uri};
        window.location.href = HOME + "/#detail/" + Base64.toBase64(JSON.stringify(item_id));
    }

    function goOut(dataset: string): void {
        window.open(TIMBUCTOO_DATASET + dataset);
    }

    function goBack() {
        window.scroll(0, 0);
        setPage(page - 1);
    }

    function goNext() {
        window.scroll(0, 0);
        setPage(page + 1);
    }

    function goToPage(pg: number) {
        window.scroll(0, 0);
        setPage(pg);
    }


    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="browserArea">
                            <h2>Dataset: {result.dataset_name}</h2>
                            <div className="browseSubHeader">
                                <div className="browseData">
                                    <div>Total hits: {result.total_hits},
                                        Page {result.page} of {result.total_pages}</div>
                                    {extendedView ? (<div className="datasetLink" onClick={() => {
                                        goOut(result.dataset_id)
                                    }}>
                                        Dataset ID: {result.dataset_id}
                                    </div>) : (<div></div>)}
                                </div>
                                <div className="browseTools">
                                    <div className="navImage" onClick={() => {
                                        window.location.href = HOME
                                    }}><img src={back}/></div>
                                    {extendedView ? (
                                        <div className="navImage" onClick={() => {
                                            setExtendedView(false)
                                        }}><img src={doc}/></div>
                                    ) : (
                                        <div className="navImage" onClick={() => {
                                            setExtendedView(true)
                                        }}><img src={wrench}/></div>
                                    )}

                                </div>
                            </div>
                            {result.items.map((item) => {
                                return (
                                    <div className="browseItem">
                                        <div className="browseHead" onClick={() => {
                                            getDetail(item.uri)
                                        }}>{item.head}</div>
                                        {item.body.map((bodyElement) => {
                                            return (<div>{bodyElement}</div>)
                                        })}
                                    </div>
                                )
                            })}
                            <div className="pager">
                                {!loading && result.total_pages > 1 ? (<div className="hcPagination">
                                        {page > 1 ? (<div className="prevBtn" onClick={() => {
                                            goBack()
                                        }}>Previous</div>) : (<div/>)}
                                        <select className="hcPageSelector"
                                                onChange={(e) => goToPage(Number(e.target.value))}>
                                            {pages.map((pg: number) => {
                                                if (pg === result.page) {
                                                    return (
                                                        <option value={pg} selected>{pg}</option>)
                                                } else {
                                                    return (
                                                        <option value={pg}>{pg}</option>)
                                                }
                                            })}
                                        </select>
                                        {page < result.total_pages ? (<div className="nextBtn" onClick={() => {
                                            goNext()
                                        }}>Next</div>) : (<div/>)}
                                    </div>)
                                    : (<div/>)}
                            </div>
                        </div>
                    )}


                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search;