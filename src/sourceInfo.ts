import { google } from '../build/pbjs';
import FileDescriptorProto = google.protobuf.FileDescriptorProto;

export type FieldID = number;

export const Fields = {
    file: {
        syntax: 12,
        message_type: 4,
        enum_type: 5,
        service: 6,
        extension: 7,
    },
    message: {
        field: 2,
        nested_type: 3,
        enum_type: 4,
    },
    enum: {
        value: 2,
    },
    service: {
        method: 2,
    },
}

export interface SourceDescription { 
    readonly span: number[];
    readonly leadingComments: string;
    readonly trailingComments: string;
    readonly leadingDetachedComments: string[];
};

class EmptyDescription implements SourceDescription {
    span = [];
    leadingComments = '';
    trailingComments = '';
    leadingDetachedComments = [];
};

export type SourceInfoMap = {
    [key: string]: SourceDescription
};

export default class SourceInfo implements SourceDescription {
    static empty() {
        return new SourceInfo({}, new EmptyDescription());
    }

    static fromDescriptor(file: FileDescriptorProto) {
        let map: SourceInfoMap = {};
        if (file && file.sourceCodeInfo && file.sourceCodeInfo.location) {
            file.sourceCodeInfo.location.reduce((m, loc) => {
                m[loc.path.join('.')] = loc;
                return m;
            }, map);
        }
        return new SourceInfo(map, new EmptyDescription());
    }

    private constructor(
        private readonly sourceCode: SourceInfoMap,
        private readonly selfDescription: SourceDescription
    ) { }

    get span() { return this.selfDescription.span; }
    get leadingComments() { return this.selfDescription.leadingComments; }
    get trailingComments() { return this.selfDescription.trailingComments; }
    get leadingDetachedComments() { return this.selfDescription.leadingDetachedComments; }

    lookup(type: FieldID, index: number): SourceDescription {
        return this.sourceCode[`${type}.${index}`] || new EmptyDescription();
    }

    open(type: FieldID, index: number): SourceInfo {
        const prefix = `${type}.${index}.`;
        const map: SourceInfoMap = {};
        Object.keys(this.sourceCode)
            .filter(key => key.startsWith(prefix))
            .reduce((m, key) => {
                m[key.substr(prefix.length)] = this.sourceCode[key];
                return m;
            }, map
        );

        return new SourceInfo(map, this.lookup(type, index));
    }
}
