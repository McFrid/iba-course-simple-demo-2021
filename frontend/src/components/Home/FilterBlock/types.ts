export type FieldValue = string[] | number[]

export enum FieldType {
    CHECKBOX, SELECT, MULTISELECT
}

export interface Field {
    name: string
    defaultValue?: string | number
    values?: FieldValue
    type: FieldType
}