import { GRAPHQL_DB_OPERATOR_MAPPING } from './const';

export function transformFilter(filters) {
  if (Object.prototype.toString.call(filters) === '[object Object]') {
    const n = {};
    for (const key in filters) {
      const mapKey = GRAPHQL_DB_OPERATOR_MAPPING[key];
      if (mapKey) {
        n[mapKey] = transformFilter(filters[key]);
      } else {
        n[key] = transformFilter(filters[key]);
      }
    }
    return n;
  } else if (Object.prototype.toString.call(filters) === '[object Array]') {
    const n = [];
    for (let i = 0; i < filters.length; i++) {
      n[i] = transformFilter(filters[i]);
    }
    return n;
  } else {
    // string
    return filters;
  }
}
