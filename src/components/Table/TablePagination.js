import { Button, Flex } from "@chakra-ui/react";

const TablePagination = ({ tableInstance }) => {
  const {
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize },
  } = tableInstance;
  return (
    <Flex justifyContent={"center"} gap={2} alignItems="center" my={2}>
      <Button onClick={() => gotoPage(0)} isDisabled={!canPreviousPage}>
        {"<<"}
      </Button>
      <Button onClick={() => previousPage()} isDisabled={!canPreviousPage}>
        {"<"}
      </Button>
      <Button onClick={() => nextPage()} isDisabled={!canNextPage}>
        {">"}
      </Button>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Göster {pageSize}
          </option>
        ))}
      </select>
    </Flex>
  );
};

export default TablePagination;
