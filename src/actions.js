export function removeCountry(id) {
  return {
    type: 'REMOVE_COUNTRY',
    id: id
  };
};

export function filterByContinent(name) {
  return {
    type: 'FILTER_CONTINENT',
    name: name
  }
}