import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableContainer,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";

import { NoData, RowSkeleton } from "components/Table";

const DataTable = ({ tableInstance }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    isLoading,
  } = tableInstance;

  return (
    <TableContainer>
      <Table {...getTableProps()} variant="striped">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  <Flex flexDirection={"column"} gap={2}>
                    <span style={{ whiteSpace: "normal" }}>
                      {column.render("Header")}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {isLoading ? (
            <RowSkeleton cellSize={11} />
          ) : rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        {...cell.getCellProps()}
                        maxWidth="100px"
                        whiteSpace={"pre-wrap"}
                      >
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })
          ) : (
            <NoData />
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
