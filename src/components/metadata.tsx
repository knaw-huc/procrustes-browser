import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import {useState} from "react";
import {SERVICE_SERVER} from "../misc/config";
import {IDataSetmetadata} from "../misc/interfaces";

function Metadata(props: { datasetID: string }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IDataSetmetadata>({} as IDataSetmetadata);

    async function fetchData() {
        const url = SERVICE_SERVER + "elastic/metadata/" + props.datasetID;
        const response = await fetch(url);
        const json: IDataSetmetadata = await response.json();
        setResult(json);
        setLoading(false);
    }

    if (loading) {
        fetchData();
    }

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    <h2>Metadata</h2>
                    {loading ? (
                        <div className="mdLoading">Loading...</div>
                    ) : (
                        <div>
                            <div className="mdLabel">Title</div>
                            <div className="mdValue">{result.title.value}</div>
                            <div className="mdLabel">Description</div>
                            <div className="mdValue">{result.description.value}</div>
                            <div className="mdLabel">Image URL</div>
                            <div className="mdValue">{result.imageUrl.value}</div>
                            <div className="mdLabel">Owner</div>
                            <div className="mdGroup">
                                <div className="mdLabel">Name</div>
                                <div className="mdValue">{result.owner.name.value}</div>
                                <div className="mdLabel">Email</div>
                                <div className="mdValue">{result.owner.email.value}</div>
                            </div>
                            <div className="mdLabel">Contact</div>
                            <div className="mdGroup">
                                <div className="mdLabel">Name</div>
                                <div className="mdValue">{result.contact.name.value}</div>
                                <div className="mdLabel">Email</div>
                                <div className="mdValue">{result.contact.email.value}</div>
                            </div>
                            <div className="mdLabel">Provenance</div>
                            <div className="mdGroup">
                                <div className="mdLabel">Title</div>
                                <div className="mdValue">{result.provenanceInfo.title.value}</div>
                                <div className="mdLabel">Body</div>
                                <div className="mdValue">{result.provenanceInfo.body.value}</div>
                            </div>
                            <div className="mdLabel">License</div>
                            <div className="mdValue">{result.license.uri}</div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Metadata;