export function transformFilter(filters) {
  const newFilter = Object.assign({}, filters);
  if (filters?.status?.ne) {
    newFilter.status.$ne = filters.status.ne;
    delete newFilter.status.ne;
  }

  return newFilter;
}
