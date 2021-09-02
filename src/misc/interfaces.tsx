export interface IDataSetmetadata {
    published: boolean,
    title: IStringValue,
    description: IStringValue,
    imageUrl: IStringValue,
    owner: IMetadataPerson,
    contact: IMetadataPerson,
    provenanceInfo: IProvenanceInfo,
    license: IMetadataLicense
}

export interface IBrowseStruc {
    page: number,
    text: string;
}

export interface IStringValue {
    value: string
}

export interface IMetadataPerson {
    name: IStringValue,
    email: IStringValue
}

export interface IProvenanceInfo {
    title: IStringValue,
    body: IStringValue
}

export interface IMetadataLicense {
    uri: string
}

export interface IBrowseResult {
    total_hits: number
    page: number,
    total_pages: number,
    dataset_name: string,
    dataset_id: string,
    items: IBrowseItem[],
}

export interface IBrowseItem {
    head: string,
    body: string[],
    uri: string;
}

export interface IDetailBrowseItem {
    head: string,
    body: string[],
    uri: string,
    index: string
}

export interface IDetailValuePair {
    key: string,
    value: string
}

export interface IDetails {
    uri: string,
    collection: string,
    see_also: IDetailBrowseItem[],
    details: IDetailValuePair[]
}

export interface ISearchString {
    dataset_id: string,
    page: number
}