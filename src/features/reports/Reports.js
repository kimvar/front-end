import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFilters, usePagination, useTable } from "react-table";
import { TablePagination, DataTable } from "components/Table";
import { TableFilter } from "components/Table";
import Layout from "components/Layout";
import { getReportsFn } from "services";
import { filtersToQueryparams } from "@utils";
import { TABLE_PROPS } from "@constants";
import { useQuery } from "react-query";
import useDebounce from "hooks/useDebounce";
import { Flex } from "@chakra-ui/react";
import DownloadButton from "./DownloadButton";
import ErrorMessage from "components/ErrorMessage";

const Reports = () => {
  const [limit, setLimit] = useState(TABLE_PROPS.PAGE_SIZE);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const isMountedRef = useRef(false);
  const isMounted = isMountedRef.current;

  const [columns, setColumns] = useState([]);
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

  const { columns: originalColumns = emptyArr, rows = emptyArr } = data || {};

  useEffect(() => {
    if (!isMounted && originalColumns.length > 0) {
      isMountedRef.current = true;
      return setColumns(originalColumns);
    }
  }, [isMounted, originalColumns]);
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

  useEffect(() => {
    if (isError) {
      setErrorMessage("Beklenmedik bir hata oluştu..");
    }
  }, [isError]);

  return (
    <Layout>
      <ErrorMessage message={errorMessage} />
      <Flex w="full" justifyContent="flex-end" mb={10}>
        <DownloadButton setErrorMessage={setErrorMessage} />
      </Flex>
      <DataTable tableInstance={tableInstance} />
      <TablePagination tableInstance={tableInstance} />
    </Layout>
  );
};

export default Reports;
