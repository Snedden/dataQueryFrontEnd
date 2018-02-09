import { IdataBaseTable } from './IdataBaseTable';
import { IdataBaseTableColumn } from '../db-column/IdataBaseTableColumn';

export class DataBaseTable implements IdataBaseTable {
    TABLE_NAME: string;
    TABLE_COLUMNS : IdataBaseTableColumn[];
    isSelected : boolean;

    constructor() {
    }
}
