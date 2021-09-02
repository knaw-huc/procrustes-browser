import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {useState, useEffect} from "react";
import {HOME, SERVICE_SERVER, TIMBUCTOO_DATASET} from "../misc/config";
import {Base64} from "js-base64";
import {IBrowseResult, IDetails} from "../misc/interfaces";
import back from "../assets/images/leftarrow32.png";
import doc from "../assets/images/linedpaper32.png";
import wrench from "../assets/images/wrench32.png";


function Detail(props: { collectionItem: string }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IDetails>({} as IDetails);
    const [extendedView, setExtendedView] = useState(false);
    const [refresh, setRefresh] = useState(false);

    async function fetchData() {
        const url = SERVICE_SERVER + "detail/" + props.collectionItem;
        const response = await fetch(url);
        const json: IDetails = await response.json();
        setResult(json);
        setLoading(false);
    }

    function getDetail(uri: string, index: string) {
        const item_id = {dataset: index, uri: uri};
        window.location.href = HOME + "/#detail/" + Base64.toBase64(JSON.stringify(item_id));
    }

    function goOut(collection: string): void {
        const data = JSON.parse(Base64.fromBase64(props.collectionItem));
        window.open(TIMBUCTOO_DATASET + data.dataset + "/" + collection + "/" + encodeURIComponent(data.uri));
        //console.log(TIMBUCTOO_DATASET + data.dataset + "/" + encodeURI(uri));
    }

    function openImage(url: string) {
        window.open(url);
    }

    useEffect(() => {
        fetchData();
    }, [refresh]);

    console.log(result.collection);
    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="browserArea">
                            <h2>Details</h2>
                            <div className="browseSubHeader">
                                <div className="browseTools">
                                    <div className="navImage" onClick={() => {
                                        window.history.back()
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
                            {extendedView ? (<div className="detailRow">
                                <div className="mdLabel">URI</div>
                                <div className="mdValue linkLine" onClick={() => {
                                    goOut(result.collection)
                                }}>{result.uri}</div>
                            </div>) : (<div>
                            </div>)}
                            {result.details.map((item) => {
                                return (<div className="detailRow">
                                    <div className="mdLabel">{item.key}</div>
                                    {item.value.toString().indexOf("images.diginfra.net") > -1 ? (
                                        <div onClick={() => openImage(item.value)}
                                             className="mdValue linkLine">{item.value}</div>) : (
                                        <div className="mdValue">{item.value}</div>)}

                                </div>)
                            })}
                            {result.see_also.length > 0 &&
                            <div>
                                <div className="mdLabel">See also:</div>
                                {result.see_also.map((member) => {
                                    return (
                                        <div className="alsoItem">
                                            <div className="mdValue linkLine" onClick={() => {
                                                getDetail(member.uri, member.index)
                                            }}>{member.head}
                                            </div>
                                            {member.body.map((line) => {
                                                return (<div className="mdValue">{line}</div>)
                                            })}
                                        </div>
                                    )
                                })}
                            </div>}
                            {result.collection.toString().indexOf("delegates") > -1 &&
                            <div className="alsoItem"><div className="mdValue linkLine">
                                Sessions attended
                            </div></div>}
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Detail;