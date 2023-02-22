import { Input } from "@chakra-ui/react";

const DefaultColumnFilter = ({ column }) => {
  const { filterValue, setFilter, Header } = column;
  return (
    <Input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`${Header}'e göre filtrele...`}
    />
  );
};

export default DefaultColumnFilter;
