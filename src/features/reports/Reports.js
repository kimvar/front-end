import React, { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useTable } from "react-table";
import DataTable from "../../components/Table/DataTable";
import TablePagination from "../../components/Table/TablePagination";
import DefaultColumnFilter from "../../components/Table/TableFilter";
import { filtersToQueryparams, getReportsFn } from "services";
import { useQuery } from "react-query";
import useDebounce from "hooks/useDebounce";

const Reports = () => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);

  const [stateFilters, setStateFilters] = useState([]);
  const debouncedLimit = useDebounce(limit, 600);
  const debouncedOffset = useDebounce(offset, 600);
  const debouncedFilters = useDebounce(stateFilters, 600);

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
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
      columns: columns,
      data: rows,
      defaultColumn,
      pageCount: index + 2,
      manualPagination: true,
      manualFilters: true,
      initialState: { pageIndex: 0, pageSize: 20 },
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
    setStateFilters(filtersToQueryparams(filters));
    setIndex(pageIndex);
  }, [pageIndex, pageSize, filters]);

  /*
   * @TODO yüklenme ui'nin geliştirilmesi gerekiyor
   */
  if (isLoading) {
    return <div>Yükleniyor..</div>;
  }

  if (isError) {
    return <div>Beklenmedik bir hata oluştu...</div>;
  }

  /**
   * @TODO son sayfada ise içerik yok hatası verilmeli.
   */
  return (
    <div>
      <DataTable tableInstance={tableInstance} />
      <TablePagination tableInstance={tableInstance} />
    </div>
  );
};

export default Reports;
