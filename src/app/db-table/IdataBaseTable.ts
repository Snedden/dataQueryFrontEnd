import { IdataBaseTableColumn } from '../db-column/IdataBaseTableColumn';
import { IdbRow } from '../db-tables/IdbRow';

export interface IdataBaseTable {
  TABLE_NAME: string;
  TABLE_COLUMNS : IdataBaseTableColumn[];
  selectedColumnNames : Set<string>;
  isSelected: boolean;

}
