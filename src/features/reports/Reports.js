import React, { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useTable } from "react-table";
import { TablePagination, DataTable } from "components/Table";
import { TableFilter } from "components/Table";
import Layout from "components/Layout";
import { getReportsFn } from "services";
import { filtersToQueryparams } from "@utils";
import { useQuery } from "react-query";
import useDebounce from "hooks/useDebounce";
import { TABLE_PROPS } from "@constants";

const Reports = () => {
  const [limit, setLimit] = useState(TABLE_PROPS.PAGE_SIZE);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);

  const [stateFilters, setStateFilters] = useState([]);
  const debouncedLimit = useDebounce(limit, 600);
  const debouncedOffset = useDebounce(offset, 600);
  const debouncedFilters = useDebounce(stateFilters, 600);

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: TableFilter,
    }),
    []
  );

  const emptyArr = useMemo(() => {
    return [];
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["reports", { debouncedLimit, debouncedOffset, debouncedFilters }],
    () =>
      getReportsFn({
        limit: debouncedLimit,
        offset: debouncedOffset,
        filters: debouncedFilters,
      })
  );

  const { columns = emptyArr, rows = emptyArr } = data || {};

  const tableInstance = useTable(
    {
      columns,
      data: rows,
      defaultColumn,
      pageCount: index + 2,
      manualPagination: true,
      manualFilters: true,
      initialState: { pageIndex: 0, pageSize: TABLE_PROPS.PAGE_SIZE },
      isLoading,
    },
    useFilters,
    usePagination
  );

  const {
    state: { pageIndex, filters, pageSize },
  } = tableInstance;

  useEffect(() => {
    setLimit(pageSize);
    setOffset(pageIndex * pageSize);
    setIndex(pageIndex);
  }, [pageIndex, pageSize]);

  useEffect(() => {
    setStateFilters(filtersToQueryparams(filters));
  }, [filters]);

  if (isError) {
    return <div>Beklenmedik bir hata oluştu...</div>;
  }

  return (
    <Layout>
      <DataTable tableInstance={tableInstance} />
      <TablePagination tableInstance={tableInstance} />
    </Layout>
  );
};

export default Reports;
