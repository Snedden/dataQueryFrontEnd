import { IdataBaseTableColumn } from '../db-column/IdataBaseTableColumn';

export interface IdataBaseTable {
  TABLE_NAME: string;
  TABLE_COLUMNS : IdataBaseTableColumn[];
  isSelected: boolean;
}
