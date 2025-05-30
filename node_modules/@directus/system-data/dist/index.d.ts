type RelationMeta = {
    id: number;
    many_collection: string;
    many_field: string;
    one_collection: string | null;
    one_field: string | null;
    one_collection_field: string | null;
    one_allowed_collections: string[] | null;
    one_deselect_action: 'nullify' | 'delete';
    junction_field: string | null;
    sort_field: string | null;
    system?: boolean;
};
type CollectionTranslations = {
    language: string;
    translation: string;
    singular: string;
    plural: string;
};
type CollectionMeta = {
    collection: string;
    note: string | null;
    hidden: boolean;
    singleton: boolean;
    icon: string | null;
    color: string | null;
    translations: CollectionTranslations[] | null;
    display_template: string | null;
    preview_url: string | null;
    versioning: boolean;
    sort_field: string | null;
    archive_field: string | null;
    archive_value: string | null;
    unarchive_value: string | null;
    archive_app_filter: boolean;
    item_duplication_fields: string[] | null;
    accountability: 'all' | 'activity' | null;
    system: boolean | null;
    sort: number | null;
    group: string | null;
    collapse: 'open' | 'closed' | 'locked';
};
type BaseCollectionMeta = Pick<CollectionMeta, 'collection' | 'note' | 'hidden' | 'singleton' | 'icon' | 'translations' | 'versioning' | 'item_duplication_fields' | 'accountability' | 'group' | 'system'>;
type DataCollectionMeta = Partial<BaseCollectionMeta> & Pick<BaseCollectionMeta, 'collection' | 'note'>;
type FieldMeta = {
    id: number;
    collection: string;
    field: string;
    group: string | null;
    hidden: boolean;
    interface: string | null;
    display: string | null;
    options: Record<string, any> | null;
    display_options: Record<string, any> | null;
    readonly: boolean;
    required: boolean;
    sort: number | null;
    special: string[] | null;
    translations: FieldTranslations[] | null;
    width: Width | null;
    note: string | null;
    conditions: Condition[] | null;
    validation: Filter | null;
    validation_message: string | null;
    system?: true;
};
type FieldTranslations = {
    language: string;
    translation: string;
};
type Width = 'half' | 'half-left' | 'half-right' | 'full' | 'fill';
type Condition = {
    name: string;
    rule: Record<string, any>;
    readonly?: boolean;
    hidden?: boolean;
    options?: Record<string, any>;
    required?: boolean;
};
type Filter = LogicalFilter | FieldFilter;
type LogicalFilterOR = {
    _or: Filter[];
};
type LogicalFilterAND = {
    _and: Filter[];
};
type LogicalFilter = LogicalFilterOR | LogicalFilterAND;
type FieldFilter = {
    [field: string]: FieldFilterOperator | FieldValidationOperator | FieldFilter;
};
type FieldFilterOperator = {
    _eq?: string | number | boolean;
    _neq?: string | number | boolean;
    _lt?: string | number;
    _lte?: string | number;
    _gt?: string | number;
    _gte?: string | number;
    _in?: (string | number)[];
    _nin?: (string | number)[];
    _null?: boolean;
    _nnull?: boolean;
    _contains?: string;
    _ncontains?: string;
    _icontains?: string;
    _starts_with?: string;
    _nstarts_with?: string;
    _istarts_with?: string;
    _nistarts_with?: string;
    _ends_with?: string;
    _nends_with?: string;
    _iends_with?: string;
    _niends_with?: string;
    _between?: (string | number)[];
    _nbetween?: (string | number)[];
    _empty?: boolean;
    _nempty?: boolean;
    _intersects?: string;
    _nintersects?: string;
    _intersects_bbox?: string;
    _nintersects_bbox?: string;
};
type FieldValidationOperator = {
    _submitted?: boolean;
    _regex?: string;
};
type Permission = {
    id?: number;
    policy: string | null;
    collection: string;
    action: PermissionsAction;
    permissions: Filter | null;
    validation: Filter | null;
    presets: Record<string, any> | null;
    fields: string[] | null;
    system?: true;
};
type PermissionsAction = 'create' | 'read' | 'update' | 'delete' | 'share';
type DataPermission = Partial<Permission> & Pick<Permission, 'collection' | 'action'>;

declare const systemCollectionRows: BaseCollectionMeta[];
declare const systemCollectionNames: string[];
declare function isSystemCollection(collection: string): boolean;

declare const systemRelationRows: RelationMeta[];

declare const systemFieldRows: FieldMeta[];

declare const schemaPermissions: Permission[];
declare const appAccessMinimalPermissions: Permission[];

export { type BaseCollectionMeta, type CollectionMeta, type CollectionTranslations, type Condition, type DataCollectionMeta, type DataPermission, type FieldFilter, type FieldFilterOperator, type FieldMeta, type FieldTranslations, type FieldValidationOperator, type Filter, type LogicalFilter, type LogicalFilterAND, type LogicalFilterOR, type Permission, type PermissionsAction, type RelationMeta, type Width, appAccessMinimalPermissions, isSystemCollection, schemaPermissions, systemCollectionNames, systemCollectionRows, systemFieldRows, systemRelationRows };
