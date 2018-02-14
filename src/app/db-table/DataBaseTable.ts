import { IdataBaseTable } from './IdataBaseTable';
import { IdataBaseTableColumn } from '../db-column/IdataBaseTableColumn';

export class DataBaseTable implements IdataBaseTable {
    TABLE_NAME: string;
    TABLE_COLUMNS: Map<string,IdataBaseTableColumn>;
    isSelected : boolean;
    selectedColumnNames : Set<string>;



    constructor() {

    }
}
