import { Skeleton, Td, Tr } from "@chakra-ui/react";
import { TABLE_PROPS } from "@constants";

const RowSkeleton = ({ cellSize }) => {
  return (
    <>
      {new Array(TABLE_PROPS.PAGE_SIZE).fill().map((_, i) => (
        <Tr key={i}>
          {new Array(cellSize).fill().map((_, i) => (
            <Td key={i}>
              <Skeleton height="20px" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};

export default RowSkeleton;
