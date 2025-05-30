import { Knex } from 'knex';

interface Table {
    name: string;
    comment?: string | null;
    schema?: string;
    collation?: string;
    engine?: string;
    owner?: string;
    sql?: string;
    catalog?: string;
}

interface Column {
    name: string;
    table: string;
    data_type: string;
    default_value: string | number | boolean | null;
    max_length: number | null;
    numeric_precision: number | null;
    numeric_scale: number | null;
    is_nullable: boolean;
    is_unique: boolean;
    is_indexed: boolean;
    is_primary_key: boolean;
    is_generated: boolean;
    generation_expression?: string | null;
    has_auto_increment: boolean;
    foreign_key_table: string | null;
    foreign_key_column: string | null;
    comment?: string | null;
    schema?: string;
    foreign_key_schema?: string | null;
}

type ForeignKey = {
    table: string;
    column: string;
    foreign_key_table: string;
    foreign_key_column: string;
    foreign_key_schema?: string;
    constraint_name: null | string;
    on_update: null | 'NO ACTION' | 'RESTRICT' | 'CASCADE' | 'SET NULL' | 'SET DEFAULT';
    on_delete: null | 'NO ACTION' | 'RESTRICT' | 'CASCADE' | 'SET NULL' | 'SET DEFAULT';
};

type SchemaOverview = {
    [table: string]: {
        primary: string;
        columns: {
            [column: string]: {
                table_name: string;
                column_name: string;
                default_value: string | null;
                is_nullable: boolean;
                is_generated: boolean;
                data_type: string;
                numeric_precision?: number | null;
                numeric_scale?: number | null;
                max_length: number | null;
            };
        };
    };
};

interface SchemaInspector {
    knex: Knex;
    overview: () => Promise<SchemaOverview>;
    tables(): Promise<string[]>;
    tableInfo(): Promise<Table[]>;
    tableInfo(table: string): Promise<Table>;
    hasTable(table: string): Promise<boolean>;
    columns(table?: string): Promise<{
        table: string;
        column: string;
    }[]>;
    columnInfo(): Promise<Column[]>;
    columnInfo(table?: string): Promise<Column[]>;
    columnInfo(table: string, column: string): Promise<Column>;
    hasColumn(table: string, column: string): Promise<boolean>;
    primary(table: string): Promise<string | null>;
    foreignKeys(table?: string): Promise<ForeignKey[]>;
    withSchema?(schema: string): void;
}
interface SchemaInspectorConstructor {
    new (knex: Knex): SchemaInspector;
}

declare const createInspector: (knex: Knex) => SchemaInspector;

export { type Column, type ForeignKey, type SchemaInspector, type SchemaInspectorConstructor, type SchemaOverview, type Table, createInspector };
