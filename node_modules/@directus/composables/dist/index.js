// src/use-collection.ts
import { computed, ref } from "vue";

// src/use-system.ts
import { API_INJECT, EXTENSIONS_INJECT, SDK_INJECT, STORES_INJECT } from "@directus/constants";
import { inject } from "vue";
function useStores() {
  const stores = inject(STORES_INJECT);
  if (!stores) throw new Error("[useStores]: The stores could not be found.");
  return stores;
}
function useApi() {
  const api = inject(API_INJECT);
  if (!api) throw new Error("[useApi]: The api could not be found.");
  return api;
}
function useSdk() {
  const sdk = inject(SDK_INJECT);
  if (!sdk) throw new Error("[useSdk]: The sdk could not be found.");
  return sdk;
}
function useExtensions() {
  const extensions = inject(EXTENSIONS_INJECT);
  if (!extensions) throw new Error("[useExtensions]: The extensions could not be found.");
  return extensions;
}

// src/use-collection.ts
function useCollection(collectionKey) {
  const { useCollectionsStore, useFieldsStore } = useStores();
  const collectionsStore = useCollectionsStore();
  const fieldsStore = useFieldsStore();
  const collection = typeof collectionKey === "string" ? ref(collectionKey) : collectionKey;
  const info = computed(() => {
    return collectionsStore.collections.find(({ collection: key }) => key === collection.value) || null;
  });
  const fields = computed(() => {
    if (!collection.value) return [];
    return fieldsStore.getFieldsForCollectionSorted(collection.value);
  });
  const defaults = computed(() => {
    if (!fields.value) return {};
    const defaults2 = {};
    for (const field of fields.value) {
      if (field.schema !== null && "default_value" in field.schema) {
        defaults2[field.field] = field.schema.default_value;
      }
    }
    return defaults2;
  });
  const primaryKeyField = computed(() => {
    return fields.value.find((field) => field.collection === collection.value && field.schema?.is_primary_key === true) || null;
  });
  const userCreatedField = computed(() => {
    return fields.value?.find((field) => (field.meta?.special || []).includes("user_created")) || null;
  });
  const sortField = computed(() => {
    return info.value?.meta?.sort_field || null;
  });
  const isSingleton = computed(() => {
    return info.value?.meta?.singleton === true;
  });
  const accountabilityScope = computed(() => {
    if (!info.value) return null;
    if (!info.value.meta) return null;
    return info.value.meta.accountability;
  });
  return { info, fields, defaults, primaryKeyField, userCreatedField, sortField, isSingleton, accountabilityScope };
}

// src/use-custom-selection.ts
import { nanoid } from "nanoid";
import { computed as computed2, ref as ref2, watch } from "vue";
function useCustomSelection(currentValue, items, emit) {
  const localOtherValue = ref2("");
  const otherValue = computed2({
    get() {
      return localOtherValue.value || (usesOtherValue.value ? currentValue.value : "");
    },
    set(newValue) {
      if (newValue === null) {
        localOtherValue.value = "";
        emit(null);
      } else {
        localOtherValue.value = newValue;
        emit(newValue);
      }
    }
  });
  const usesOtherValue = computed2(() => {
    if (items.value === null) return false;
    const values = items.value.map((item) => item.value);
    return currentValue.value !== null && currentValue.value.length > 0 && values.includes(currentValue.value) === false;
  });
  return { otherValue, usesOtherValue };
}
function useCustomSelectionMultiple(currentValues, items, emit) {
  const otherValues = ref2([]);
  watch(
    currentValues,
    (newValue) => {
      if (newValue === null) return;
      if (!Array.isArray(newValue)) return;
      if (items.value === null) return;
      newValue.forEach((value) => {
        if (items.value === null) return;
        const values = items.value.map((item) => item.value);
        const existsInValues = values.includes(value);
        if (!existsInValues) {
          const other = otherValues.value.map((o) => o.value);
          const existsInOtherValues = other.includes(value);
          if (!existsInOtherValues) {
            addOtherValue(value);
          }
        }
      });
    },
    { immediate: true }
  );
  return { otherValues, addOtherValue, setOtherValue };
  function addOtherValue(value = "") {
    otherValues.value = [
      ...otherValues.value,
      {
        key: nanoid(),
        value
      }
    ];
  }
  function setOtherValue(key, newValue) {
    const previousValue = otherValues.value.find((o) => o.key === key);
    const valueWithoutPrevious = (currentValues.value || []).filter(
      (val) => val !== previousValue?.value
    );
    if (newValue === null) {
      otherValues.value = otherValues.value.filter((o) => o.key !== key);
      if (valueWithoutPrevious.length === 0) {
        emit(null);
      } else {
        emit(valueWithoutPrevious);
      }
    } else {
      otherValues.value = otherValues.value.map((otherValue) => {
        if (otherValue.key === key) otherValue.value = newValue;
        return otherValue;
      });
      if (valueWithoutPrevious.length === currentValues.value?.length) {
        emit(valueWithoutPrevious);
      } else {
        emit([...valueWithoutPrevious, newValue]);
      }
    }
  }
}

// src/use-element-size.ts
import { isNil } from "lodash-es";
import { isRef, onMounted, onUnmounted, ref as ref3 } from "vue";
function useElementSize(target) {
  const width = ref3(0);
  const height = ref3(0);
  const resizeObserver = new ResizeObserver(([entry]) => {
    if (entry === void 0) return;
    width.value = entry.contentRect.width;
    height.value = entry.contentRect.height;
  });
  onMounted(() => {
    const t = isRef(target) ? target.value : target;
    if (!isNil(t)) {
      resizeObserver.observe(t);
    }
  });
  onUnmounted(() => {
    resizeObserver.disconnect();
  });
  return { width, height };
}

// src/use-filter-fields.ts
import { computed as computed3 } from "vue";
function useFilterFields(fields, filters) {
  const fieldGroups = computed3(() => {
    const acc = {};
    for (const name in filters) {
      acc[name] = [];
    }
    return fields.value.reduce((acc2, field) => {
      for (const name in filters) {
        if (filters[name](field) === false) continue;
        acc2[name].push(field);
      }
      return acc2;
    }, acc);
  });
  return { fieldGroups };
}

// src/use-groupable.ts
import { isEqual, isNil as isNil2 } from "lodash-es";
import { computed as computed4, inject as inject2, nextTick, onBeforeUnmount, provide, ref as ref4, shallowRef, watch as watch2 } from "vue";
function useGroupable(options) {
  const parentFunctions = inject2(options?.group || "item-group", null);
  if (isNil2(parentFunctions)) {
    return {
      active: ref4(false),
      toggle: () => {
      },
      activate: () => {
      },
      deactivate: () => {
      }
    };
  }
  const {
    register,
    unregister,
    toggle,
    selection
  } = parentFunctions;
  let startActive = false;
  if (options?.active?.value === true) startActive = true;
  if (options?.value && selection.value.includes(options.value)) startActive = true;
  const active = ref4(startActive);
  const item = { active, value: options?.value };
  register(item);
  if (options?.active !== void 0 && options.watch === true) {
    watch2(options.active, () => {
      if (options.active === void 0) return;
      if (options.active.value === true) {
        if (active.value === false) toggle(item);
        active.value = true;
      }
      if (options.active.value === false) {
        if (active.value === true) toggle(item);
        active.value = false;
      }
    });
  }
  onBeforeUnmount(() => unregister(item));
  return {
    active,
    toggle: () => {
      toggle(item);
    },
    activate: () => {
      if (active.value === false) toggle(item);
    },
    deactivate: () => {
      if (active.value === true) toggle(item);
    }
  };
}
function useGroupableParent(state = {}, options = {}, group = "item-group") {
  const items = shallowRef([]);
  const internalSelection = ref4([]);
  const selection = computed4({
    get() {
      if (!isNil2(state.selection) && !isNil2(state.selection.value)) {
        return state.selection.value;
      }
      return internalSelection.value;
    },
    set(newSelection) {
      if (!isNil2(state.onSelectionChange)) {
        state.onSelectionChange(newSelection);
      }
      internalSelection.value = [...newSelection];
    }
  });
  provide(group, { register, unregister, toggle, selection });
  watch2(selection, updateChildren, { immediate: true });
  nextTick().then(updateChildren);
  watch2(
    () => options?.mandatory?.value,
    (newValue, oldValue) => {
      if (isEqual(newValue, oldValue)) return;
      if (!selection.value || selection.value.length === 0 && options?.mandatory?.value === true) {
        if (items.value[0]) selection.value = [getValueForItem(items.value[0])];
      }
    }
  );
  return { items, selection, internalSelection, getValueForItem, updateChildren };
  function register(item) {
    items.value = [...items.value, item];
    const value = getValueForItem(item);
    if (selection.value.length === 0 && options?.mandatory?.value === true && items.value.length === 1) {
      selection.value = [value];
    }
    if (item.active.value && selection.value.includes(value) === false) {
      toggle(item);
    }
  }
  function unregister(item) {
    items.value = items.value.filter((existingItem) => {
      return existingItem !== item;
    });
  }
  function toggle(item) {
    if (options?.multiple?.value === true) {
      toggleMultiple(item);
    } else {
      toggleSingle(item);
    }
    if (!isNil2(state.onToggle)) {
      state.onToggle(item);
    }
  }
  function toggleSingle(item) {
    const itemValue = getValueForItem(item);
    if (selection.value[0] === itemValue && options?.mandatory?.value !== true) {
      selection.value = [];
      return;
    }
    if (selection.value[0] !== itemValue) {
      selection.value = [itemValue];
    }
  }
  function toggleMultiple(item) {
    const itemValue = getValueForItem(item);
    if (selection.value.includes(itemValue)) {
      if (options?.mandatory?.value === true && selection.value.length === 1) {
        updateChildren();
        return;
      }
      selection.value = selection.value.filter((value) => value !== itemValue);
      return;
    }
    if (options?.max?.value && options.max.value !== -1 && selection.value.length >= options.max.value) {
      updateChildren();
      return;
    }
    selection.value = [...selection.value, itemValue];
  }
  function getValueForItem(item) {
    return item.value || items.value.findIndex((child) => item === child);
  }
  function updateChildren() {
    items.value.forEach((item) => {
      item.active.value = selection.value.includes(getValueForItem(item));
    });
  }
}

// src/use-items.ts
import { getEndpoint, moveInArray } from "@directus/utils";
import axios from "axios";
import { isEqual as isEqual2, throttle } from "lodash-es";
import { computed as computed5, ref as ref5, toRef, unref, watch as watch3 } from "vue";
function useItems(collection, query) {
  const api = useApi();
  const { primaryKeyField } = useCollection(collection);
  const { fields, limit, sort, search, filter, page, filterSystem, alias, deep } = query;
  const endpoint = computed5(() => {
    if (!collection.value) return null;
    return getEndpoint(collection.value);
  });
  const items = ref5([]);
  const loading = ref5(false);
  const error = ref5(null);
  const itemCount = ref5(null);
  const totalCount = ref5(null);
  const totalPages = computed5(() => {
    if (itemCount.value === null) return 1;
    if (itemCount.value < (unref(limit) ?? 100)) return 1;
    return Math.ceil(itemCount.value / (unref(limit) ?? 100));
  });
  const existingRequests = {
    items: null,
    total: null,
    filter: null
  };
  let loadingTimeout = null;
  const fetchItems = throttle(getItems, 500);
  watch3(
    [collection, limit, sort, search, filter, fields, page, toRef(alias), toRef(deep)],
    async (after, before) => {
      if (isEqual2(after, before)) return;
      const [newCollection, newLimit, newSort, newSearch, newFilter] = after;
      const [oldCollection, oldLimit, oldSort, oldSearch, oldFilter] = before;
      if (!newCollection || !query) return;
      if (newCollection !== oldCollection) {
        reset();
      }
      if (!isEqual2(newFilter, oldFilter) || !isEqual2(newSort, oldSort) || newLimit !== oldLimit || newSearch !== oldSearch) {
        if (oldCollection) {
          page.value = 1;
        }
      }
      if (newCollection !== oldCollection || !isEqual2(newFilter, oldFilter) || newSearch !== oldSearch) {
        getItemCount();
      }
      fetchItems();
    },
    { deep: true, immediate: true }
  );
  watch3(
    [collection, toRef(filterSystem)],
    async (after, before) => {
      if (isEqual2(after, before)) return;
      getTotalCount();
    },
    { deep: true, immediate: true }
  );
  return {
    itemCount,
    totalCount,
    items,
    totalPages,
    loading,
    error,
    changeManualSort,
    getItems,
    getItemCount,
    getTotalCount
  };
  async function getItems() {
    if (!endpoint.value) return;
    let isCurrentRequestCanceled = false;
    if (existingRequests.items) existingRequests.items.abort();
    existingRequests.items = new AbortController();
    error.value = null;
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
    loadingTimeout = setTimeout(() => {
      loading.value = true;
    }, 150);
    let fieldsToFetch = [...unref(fields) ?? []];
    if (!unref(fields)?.includes("*") && primaryKeyField.value && fieldsToFetch.includes(primaryKeyField.value.field) === false) {
      fieldsToFetch.push(primaryKeyField.value.field);
    }
    fieldsToFetch = fieldsToFetch.filter((field) => field.startsWith("$") === false);
    try {
      const response = await api.get(endpoint.value, {
        params: {
          limit: unref(limit),
          fields: fieldsToFetch,
          ...alias ? { alias: unref(alias) } : {},
          sort: unref(sort),
          page: unref(page),
          search: unref(search),
          filter: unref(filter),
          deep: unref(deep)
        },
        signal: existingRequests.items.signal
      });
      let fetchedItems = response.data.data;
      existingRequests.items = null;
      if (collection.value === "directus_files") {
        fetchedItems = fetchedItems.map((file) => ({
          ...file,
          $thumbnail: file
        }));
      }
      items.value = fetchedItems;
      if (page && fetchedItems.length === 0 && page?.value !== 1) {
        page.value = 1;
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        isCurrentRequestCanceled = true;
      } else {
        error.value = err;
      }
    } finally {
      if (loadingTimeout && !isCurrentRequestCanceled) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      if (!loadingTimeout) loading.value = false;
    }
  }
  function reset() {
    items.value = [];
    totalCount.value = null;
    itemCount.value = null;
  }
  async function changeManualSort({ item, to }) {
    const pk = primaryKeyField.value?.field;
    if (!pk) return;
    const fromIndex = items.value.findIndex((existing) => existing[pk] === item);
    const toIndex = items.value.findIndex((existing) => existing[pk] === to);
    items.value = moveInArray(items.value, fromIndex, toIndex);
    const endpoint2 = computed5(() => `/utils/sort/${collection.value}`);
    await api.post(endpoint2.value, { item, to });
  }
  async function getTotalCount() {
    if (!endpoint.value) return;
    try {
      if (existingRequests.total) existingRequests.total.abort();
      existingRequests.total = new AbortController();
      const aggregate = primaryKeyField.value ? {
        countDistinct: primaryKeyField.value.field
      } : {
        count: "*"
      };
      const response = await api.get(endpoint.value, {
        params: {
          aggregate,
          filter: unref(filterSystem)
        },
        signal: existingRequests.total.signal
      });
      const count = primaryKeyField.value ? Number(response.data.data[0].countDistinct[primaryKeyField.value.field]) : Number(response.data.data[0].count);
      existingRequests.total = null;
      totalCount.value = count;
    } catch (err) {
      if (!axios.isCancel(err)) {
        throw err;
      }
    }
  }
  async function getItemCount() {
    if (!endpoint.value) return;
    try {
      if (existingRequests.filter) existingRequests.filter.abort();
      existingRequests.filter = new AbortController();
      const aggregate = primaryKeyField.value ? {
        countDistinct: primaryKeyField.value.field
      } : {
        count: "*"
      };
      const response = await api.get(endpoint.value, {
        params: {
          filter: unref(filter),
          search: unref(search),
          aggregate
        },
        signal: existingRequests.filter.signal
      });
      const count = primaryKeyField.value ? Number(response.data.data[0].countDistinct[primaryKeyField.value.field]) : Number(response.data.data[0].count);
      existingRequests.filter = null;
      itemCount.value = count;
    } catch (err) {
      if (!axios.isCancel(err)) {
        throw err;
      }
    }
  }
}

// src/use-layout.ts
import { computed as computed6, defineComponent, reactive, toRefs } from "vue";
var NAME_SUFFIX = "wrapper";
var WRITABLE_PROPS = ["selection", "layoutOptions", "layoutQuery"];
function isWritableProp(prop) {
  return WRITABLE_PROPS.includes(prop);
}
function createLayoutWrapper(layout) {
  return defineComponent({
    name: `${layout.id}-${NAME_SUFFIX}`,
    props: {
      collection: {
        type: String,
        required: true
      },
      selection: {
        type: Array,
        default: () => []
      },
      layoutOptions: {
        type: Object,
        default: () => ({})
      },
      layoutQuery: {
        type: Object,
        default: () => ({})
      },
      layoutProps: {
        type: Object,
        default: () => ({})
      },
      filter: {
        type: Object,
        default: null
      },
      filterUser: {
        type: Object,
        default: null
      },
      filterSystem: {
        type: Object,
        default: null
      },
      search: {
        type: String,
        default: null
      },
      showSelect: {
        type: String,
        default: "multiple"
      },
      selectMode: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      resetPreset: {
        type: Function,
        default: null
      },
      clearFilters: {
        type: Function,
        default: null
      }
    },
    emits: WRITABLE_PROPS.map((prop) => `update:${prop}`),
    setup(props, { emit }) {
      const state = reactive({ ...layout.setup(props, { emit }), ...toRefs(props) });
      for (const key in state) {
        state[`onUpdate:${key}`] = (value) => {
          if (isWritableProp(key)) {
            emit(`update:${key}`, value);
          } else if (!Object.keys(props).includes(key)) {
            state[key] = value;
          }
        };
      }
      return { state };
    },
    render(ctx) {
      return ctx.$slots.default !== void 0 ? ctx.$slots.default({ layoutState: ctx.state }) : null;
    }
  });
}
function useLayout(layoutId) {
  const { layouts } = useExtensions();
  const layoutWrappers = computed6(() => layouts.value.map((layout) => createLayoutWrapper(layout)));
  const layoutWrapper = computed6(() => {
    const layout = layoutWrappers.value.find((layout2) => layout2.name === `${layoutId.value}-${NAME_SUFFIX}`);
    if (layout === void 0) {
      return layoutWrappers.value.find((layout2) => layout2.name === `tabular-${NAME_SUFFIX}`);
    }
    return layout;
  });
  return { layoutWrapper };
}

// src/use-size-class.ts
import { computed as computed7 } from "vue";
var sizeProps = {
  xSmall: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  large: {
    type: Boolean,
    default: false
  },
  xLarge: {
    type: Boolean,
    default: false
  }
};
function useSizeClass(props) {
  const sizeClass = computed7(() => {
    if (props.xSmall) return "x-small";
    if (props.small) return "small";
    if (props.large) return "large";
    if (props.xLarge) return "x-large";
    return null;
  });
  return sizeClass;
}

// src/use-sync.ts
import { computed as computed8 } from "vue";
function useSync(props, key, emit) {
  return computed8({
    get() {
      return props[key];
    },
    set(newVal) {
      emit(`update:${key}`, newVal);
    }
  });
}
export {
  sizeProps,
  useApi,
  useCollection,
  useCustomSelection,
  useCustomSelectionMultiple,
  useElementSize,
  useExtensions,
  useFilterFields,
  useGroupable,
  useGroupableParent,
  useItems,
  useLayout,
  useSdk,
  useSizeClass,
  useStores,
  useSync
};
