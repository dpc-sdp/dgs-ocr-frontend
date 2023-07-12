export interface DocData {
    rawData: any,
    pdf: string;
    fileName: string;
    fileContents: FileContent[]
};

export interface Parser {
    name: string;
    input: string;
    message: string;
    output: string;
    parms: string;
    status: number;
}

export interface Validation {
    name: string;
    input: string;
    message: string;
    output: string;
    parms: string;
    status: number;
}

export interface FileContent {
    field_name: string;
    confidence: number;
    parsers: Parser[];
    raw_value: string;
    validations: Validation[];
    value: string;
    value_type: string;
    raw_value_type: string;
}


export const contentMapper = (rawData: any): FileContent[] => {
    const fileContents: FileContent[] = [];
    const { expected_fields } = rawData;

    for (var key in expected_fields) {
        const feildInfo = expected_fields[key];
        fileContents.push({
            ...feildInfo,
            field_name: key
        })
    }
    return fileContents;
}

export interface AppContext {
    data: DocData[],
    selectedIndex: number;
};
