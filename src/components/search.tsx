import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {useState, useEffect} from "react";
import {HOME, SERVICE_SERVER, TIMBUCTOO_DATASET} from "../misc/config";
import {IBrowseResult, IBrowseStruc} from "../misc/interfaces";
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
    const [searchStruc, setSearchStruc] = useState<IBrowseStruc>({page: 1, text: ""});
    const [field, setField] = useState("");

    async function fetchData() {
        const url = SERVICE_SERVER + "elastic/browse/" + props.datasetID + "/" + Base64.toBase64(JSON.stringify(searchStruc));
        const response = await fetch(url);
        const json: IBrowseResult = await response.json();
        setPages(createPages(json));
        setResult(json);
        setLoading(false);
    }

    function createPages(json: IBrowseResult) {
        let arr: number[] = [];
        for (var i: number = 1; i <= json.total_pages; i++) {
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
        goToPage(page - 1);
    }

    function goNext() {
        goToPage(page + 1);
    }

    function goToPage(pg: number) {
        window.scroll(0, 0);
        const newPage: number = pg;
        let struc: IBrowseStruc = searchStruc;
        struc.page = newPage;
        setSearchStruc(struc);
        setPage(newPage);
        setRefresh(!refresh);
    }

    function searchInDataset() {
        window.scroll(0, 0);
        let struc: IBrowseStruc = searchStruc;
        struc.page = 1;
        struc.text = field;
        setSearchStruc(struc);
        setPage(1);
        setRefresh(!refresh);
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        setField(e.currentTarget.value);
    }

    function reset() {
        window.scroll(0, 0);
        let struc: IBrowseStruc = searchStruc;
        setField("");
        struc.page = 1;
        struc.text = "";
        setSearchStruc(struc);
        setPage(1);
        setLoading(true);
        setRefresh(!refresh);
    }


    useEffect(() => {
        fetchData();
    }, [refresh]);


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
                                    <div className="search">
                                        <div className="hcFacetFilter">

                                            <input type="text"
                                                   placeholder="Type text"
                                                   defaultValue={field}
                                                   onChange={handleChange}/>
                                        </div>
                                        <button onClick={searchInDataset} className="ftSearchBtn">Search</button>
                                        &nbsp;
                                        <button className="ftSearchBtn" onClick={reset}>Reset</button>
                                    </div>
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
                            {result.total_hits > 0 ?
                                (<div>{result.items.map((item) => {
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
                                })}</div>) : (
                                    <div className="noResults">No results!</div>
                                )}

                            <div className="pager">
                                {!loading && result.total_pages > 1 ? (<div className="hcPagination">
                                        {page > 1 ? (<div className="prevBtn" onClick={() => {
                                            goBack()
                                        }}>Previous</div>) : (<div/>)}
                                        <div className="ddCell">
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
                                            </select></div>
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