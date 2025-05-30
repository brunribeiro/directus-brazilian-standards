import { AppCollection, Field, Item, Query, RefRecord } from '@directus/types';
import { ComputedRef, Ref, WritableComputedRef, Component } from 'vue';
import { AppExtensionConfigs } from '@directus/extensions';
import { DirectusClient, RestClient } from '@directus/sdk';
import { AxiosInstance } from 'axios';

type UsableCollection = {
    info: ComputedRef<AppCollection | null>;
    fields: ComputedRef<Field[]>;
    defaults: ComputedRef<Record<string, any>>;
    primaryKeyField: ComputedRef<Field | null>;
    userCreatedField: ComputedRef<Field | null>;
    sortField: ComputedRef<string | null>;
    isSingleton: ComputedRef<boolean>;
    accountabilityScope: ComputedRef<'all' | 'activity' | null>;
};
declare function useCollection(collectionKey: string | Ref<string | null>): UsableCollection;

type UsableCustomSelection = {
    otherValue: Ref<string | null>;
    usesOtherValue: ComputedRef<boolean>;
};
declare function useCustomSelection(currentValue: Ref<string | null>, items: Ref<any[]>, emit: (event: string | null) => void): UsableCustomSelection;
type OtherValue = {
    key: string;
    value: string;
};
type UsableCustomSelectionMultiple = {
    otherValues: Ref<OtherValue[]>;
    addOtherValue: (value?: string) => void;
    setOtherValue: (key: string, newValue: string | null) => void;
};
declare function useCustomSelectionMultiple(currentValues: Ref<string[] | null>, items: Ref<any[]>, emit: (event: string[] | null) => void): UsableCustomSelectionMultiple;

declare global {
    interface Window {
        ResizeObserver: any;
    }
}
declare function useElementSize<T extends Element>(target: T | Ref<T> | Ref<undefined>): {
    width: Ref<number>;
    height: Ref<number>;
};

declare function useFilterFields<T extends string>(fields: Ref<Field[]>, filters: Record<T, (field: Field) => boolean>): {
    fieldGroups: ComputedRef<Record<Extract<T, string>, Field[]>>;
};

type GroupableInstance = {
    active: Ref<boolean>;
    value: string | number | undefined;
};
/**
 * Used to make child item part of the group context. Needs to be used in a component that is a child
 * of a component that has the `useGroupableParent` composition enabled
 */
type GroupableOptions = {
    value?: string | number;
    group?: string;
    active?: Ref<boolean>;
    watch?: boolean;
};
type UsableGroupable = {
    active: Ref<boolean>;
    toggle: () => void;
    activate: () => void;
    deactivate: () => void;
};
declare function useGroupable(options?: GroupableOptions): UsableGroupable;
type GroupableParentState = {
    selection?: Ref<(string | number)[] | undefined> | Ref<readonly (string | number)[] | undefined>;
    onSelectionChange?: (newSelectionValues: readonly (string | number)[]) => void;
    onToggle?: (item: GroupableInstance) => void;
};
type GroupableParentOptions = {
    mandatory?: Ref<boolean>;
    max?: Ref<number>;
    multiple?: Ref<boolean>;
};
type UsableGroupableParent = {
    items: Ref<GroupableInstance[]>;
    selection: Ref<readonly (string | number)[]>;
    internalSelection: Ref<(string | number)[]>;
    getValueForItem: (item: GroupableInstance) => string | number;
    updateChildren: () => void;
};
/**
 * Used to make a component a group parent component. Provides the registration / toggle functions
 * to its group children
 */
declare function useGroupableParent(state?: GroupableParentState, options?: GroupableParentOptions, group?: string): UsableGroupableParent;

type ManualSortData = {
    item: string | number;
    to: string | number;
};
type UsableItems = {
    itemCount: Ref<number | null>;
    totalCount: Ref<number | null>;
    items: Ref<Item[]>;
    totalPages: ComputedRef<number>;
    loading: Ref<boolean>;
    error: Ref<any>;
    changeManualSort: (data: ManualSortData) => Promise<void>;
    getItems: () => Promise<void>;
    getTotalCount: () => Promise<void>;
    getItemCount: () => Promise<void>;
};
type ComputedQuery = {
    fields: Ref<Query['fields']> | ComputedRef<Query['fields']> | WritableComputedRef<Query['fields']>;
    limit: Ref<Query['limit']> | ComputedRef<Query['limit']> | WritableComputedRef<Query['limit']>;
    sort: Ref<Query['sort']> | ComputedRef<Query['sort']> | WritableComputedRef<Query['sort']>;
    search: Ref<Query['search']> | ComputedRef<Query['search']> | WritableComputedRef<Query['search']>;
    filter: Ref<Query['filter']> | ComputedRef<Query['filter']> | WritableComputedRef<Query['filter']>;
    page: Ref<Query['page']> | WritableComputedRef<Query['page']>;
    /** System filter applied to total item count. */
    filterSystem?: Ref<Query['filter']> | ComputedRef<Query['filter']> | WritableComputedRef<Query['filter']>;
    alias?: Ref<Query['alias']> | ComputedRef<Query['alias']> | WritableComputedRef<Query['alias']>;
    deep?: Ref<Query['deep']> | ComputedRef<Query['deep']> | WritableComputedRef<Query['deep']>;
};
declare function useItems(collection: Ref<string | null>, query: ComputedQuery): UsableItems;

declare function useLayout<Options = any, Query = any>(layoutId: Ref<string | null>): {
    layoutWrapper: ComputedRef<Component>;
};

declare const sizeProps: {
    xSmall: {
        type: BooleanConstructor;
        default: boolean;
    };
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
    large: {
        type: BooleanConstructor;
        default: boolean;
    };
    xLarge: {
        type: BooleanConstructor;
        default: boolean;
    };
};
interface SizeProps {
    xSmall?: boolean;
    small?: boolean;
    large?: boolean;
    xLarge?: boolean;
}
declare function useSizeClass<T>(props: T & SizeProps): ComputedRef<string | null>;

declare function useSync<T, K extends keyof T & string, E extends (event: `update:${K}`, ...args: any[]) => void>(props: T, key: K, emit: E): Ref<T[K]>;

declare function useStores(): Record<string, any>;
declare function useApi(): AxiosInstance;
declare function useSdk<Schema extends object = any>(): DirectusClient<Schema> & RestClient<Schema>;
declare function useExtensions(): RefRecord<AppExtensionConfigs>;

export { type ComputedQuery, type GroupableInstance, type GroupableOptions, type ManualSortData, type UsableCollection, type UsableCustomSelection, type UsableGroupable, type UsableItems, sizeProps, useApi, useCollection, useCustomSelection, useCustomSelectionMultiple, useElementSize, useExtensions, useFilterFields, useGroupable, useGroupableParent, useItems, useLayout, useSdk, useSizeClass, useStores, useSync };
