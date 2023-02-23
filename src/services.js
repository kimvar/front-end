import axios from "./@axios";

/**
 * @TODO utils klasörü olması lazım
 * sadeleştirilmeli
 */

export const filtersToQueryparams = (filters) => {
  const filtersReduced = filters
    .map((item) => {
      return {
        [item.id]: item.value,
      };
    })
    .reduce((acc, val) => {
      return { ...acc, ...val };
    }, {});

  let filterQuery = "";
  if (filtersReduced && Object.keys(filtersReduced).length > 0) {
    filterQuery = `&filters=${JSON.stringify(filtersReduced)}`;
  }

  return filterQuery;
};

export const getReportsFn = async ({ limit, offset, filters }) => {
  const response = await axios.get(
    `/report?limit=${limit}&offset=${offset}${filters}`
  );
  return response.data;
};