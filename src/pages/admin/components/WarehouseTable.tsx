import {
  Flex,
  Box,
  Table,
  Checkbox,
  SimpleGrid,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
// import Link from "next/link";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// Custom components
import Card from "@/components/card/Card";

type RowObj = {
  whNumber: string;
  name: string;
  location: string;
  status: string;
  responsiblePerson: string;
  logisticAreaCode: string;
  action: any;
  description: string;
  plant: string;
  storageLocation: string;
  address: string;
  type: string;
  storageType: string;
  storageTypeDes: string;
  storageTypeRole: string;
  placementStrategy: string;
  removalStrategy: string;
  capacityCheck: string;
  weightCheck: string;
  hazardousIndicator: string;
  storageSection: string;
  storageSectionDes: string;
  sectionArea: string;
  sectionVolume: string;
  tempControl: string;
  storageBin: string;
  storageBinDes: string;
  binType: string;
  binCapacity: string;
  binWeightCapacity: string;
  binLength: string;
  binWidth: string;
  binHeight: string;
  occupancyStatus: string;
  binHazardousIndicator: string;
  configurationDate: string;
  lastUpdatedDate: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function WarehouseTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  let defaultData = tableData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = React.useState<RowObj | null>(null);

  const columns = [
    columnHelper.accessor("whNumber", {
      id: "whNumber",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          NUMBER
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          NAME
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ADDRESS
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("logisticAreaCode", {
      id: "logisticAreaCode",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          AREA CODES
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("plant", {
      id: "plant",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          PLANT
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          STATUS
        </Text>
      ),
      cell: (info) => {
        const status = info.getValue();
        const bgColor = status === "Active" ? "#e6ffe7" : "#ffe6e6";
        const textColor = status === "Active" ? "#0ce917" : "#e91717";

        return (
          <Tag bg={bgColor} color={textColor} fontSize="sm" fontWeight="500">
            {status}
          </Tag>
        );
      },
    }),
    columnHelper.accessor("responsiblePerson", {
      id: "responsiblePerson",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          RESPONSIBLE PERSON
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("action", {
      id: "action",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ACTION
        </Text>
      ),
      cell: (info) => (
        <Box>
          <button
            className="btn btn-green"
            onClick={() => {
              setSelectedRow(info.row.original);
              onOpen();
            }}
          >
            View
          </button>
        </Box>
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Warehouse List
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warehouse Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRow && (
              <Box>
                <SimpleGrid columns={{ base: 1, md: 3 }} mb="3" mt="3">
                  <Text>
                    <strong>Warehouse Number:</strong> {selectedRow.whNumber}
                  </Text>
                  <Text>
                    <strong>Description:</strong> {selectedRow.description}
                  </Text>
                  <Text>
                    <strong>Storage Location:</strong>{" "}
                    {selectedRow.storageLocation}
                  </Text>
                </SimpleGrid>
                <hr />
                <SimpleGrid columns={{ base: 1, md: 3 }} mb="3" mt="3">
                  <Text>
                    <strong>Warehouse Address:</strong> {selectedRow.location}
                  </Text>
                  <Text>
                    <strong>Plant:</strong> {selectedRow.plant}
                  </Text>
                  <Text>
                    <strong>Responsible Person:</strong>{" "}
                    {selectedRow.responsiblePerson}
                  </Text>
                </SimpleGrid>
                <hr />
                <SimpleGrid columns={{ base: 1, md: 3 }} mb="3" mt="3">
                  <Text>
                    <strong>Logistics Area Codes:</strong>{" "}
                    {selectedRow.logisticAreaCode}
                  </Text>
                </SimpleGrid>
                <hr />

                <Text mt="3">
                  <strong>All Area Codes:</strong> LA001, LA002, LA003, LA004,
                  LA005, LA006, LA007, LA008, LA009, LA0010, LA0011, LA0012,
                  LA0013, LA0014, LA0015, LA0016, LA0017, LA0018, LA0019, LA0020
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-green" onClick={onClose}>
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
