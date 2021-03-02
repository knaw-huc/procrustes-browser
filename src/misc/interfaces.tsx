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
    page: number,
    total_pages: number,
    result: IBrowseItem[]
}

export interface IBrowseItem {
    item: string
}

export interface IDetailValuePairs {
    key: string,
    value: string
}

export interface ISearchString {
    dataset_id: string,
    page: number
}