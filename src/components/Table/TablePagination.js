import { Button, Flex } from "@chakra-ui/react";
import { TABLE_PROPS } from "@constants";

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
        {TABLE_PROPS.SELECTABLE_PAGE_SIZES.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Göster {pageSize}
          </option>
        ))}
      </select>
    </Flex>
  );
};

export default TablePagination;
