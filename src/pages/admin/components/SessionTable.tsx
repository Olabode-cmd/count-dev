import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Tag,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
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
  id: number;
  name: string;
  status: string;
  date: string;
  action: any;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function SessionTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  let defaultData = tableData;
  // const history = useHistory();
  const {
    isOpen: isOpenViewModal,
    onOpen: onOpenViewModal,
    onClose: onCloseViewModal,
  } = useDisclosure();
  const {
    isOpen: isOpenConfigModal,
    onOpen: onOpenConfigModal,
    onClose: onCloseConfigModal,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = React.useState<RowObj | null>(null);

  const [isClosed, setIsClosed] = useState(false);
  const toast = useToast();


  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ID
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
          SESSION NAME
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

        let bgColor, textColor;

        switch (status) {
          case "Upcoming":
            bgColor = "#cbdaf5";
            textColor = "#1156d6";
            break;
          case "Ongoing":
            bgColor = "#d3d3d3";
            textColor = "#000000";
            break;
          case "Closed":
            bgColor = "#ffe6e6";
            textColor = "#ff0000";
            break;
          case "Completed":
            bgColor = "#e6ffe7";
            textColor = "#0ce917";
            break;
          default:
            bgColor = "#ffffff";
            textColor = "#000000";
            break;
        }

        return (
          <Tag bg={bgColor} color={textColor} fontSize="sm" fontWeight="500">
            {status}
          </Tag>
        );
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          DATE
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
        <Flex>
          <button
            className="btn btn-green ml-2"
            onClick={() => {
              // history.push(`/session/${info.row.original.id}`);
            }}
          >
            View
          </button>
          <button
            className="btn btn-green ml-2"
            onClick={() => {
              setSelectedRow(info.row.original);
              onOpenConfigModal();
            }}
          >
            Config
          </button>
        </Flex>
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

  const [productListFileName, setProductListFileName] = useState<string | null>(
    null
  );
  const [stockFileName, setStockFileName] = useState<string | null>(null);
  const [batchDetailsFileName, setBatchDetailsFileName] = useState<
    string | null
  >(null);

  const downloadTemplate = (templateName: string) => {
    const templates: { [key: string]: string } = {
      productList: "/ProductList.xlsx",
      StockPosition: "/StockPosition.xlsx",
      batchDetails: "/BatchDetails.xlsx",
    };

    const link = document.createElement("a");
    link.href = templates[templateName];
    link.download = templates[templateName];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFileName: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

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
          Count Sessions
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
      <Modal isOpen={isOpenViewModal} onClose={onCloseViewModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          {selectedRow && (
            <Box>
              <ModalHeader>Session Details: {selectedRow.name}</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Box>
                  <SimpleGrid columns={{ base: 1, md: 2 }} mb="3" mt="3">
                    <Text>
                      <strong>Name:</strong> {selectedRow.name}
                    </Text>
                    <Text>
                      <strong>Period:</strong> {selectedRow.date}
                    </Text>
                  </SimpleGrid>
                  <hr />
                </Box>
              </ModalBody>
            </Box>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenConfigModal} onClose={onCloseConfigModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          {selectedRow && (
            <Box>
              <ModalHeader>Config data: {selectedRow.name}</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Box>
                  <Text mb="2">
                    Download the excel template if you don&apos;t already have
                    it for all data, gently fill in the appropriate cells and
                    upload details.
                  </Text>
                  <Text mb="4">
                    Be sure to double-check details before uploading to avoid
                    errors.
                  </Text>
                  <hr />
                  <Text fontWeight="700" mt="2">
                    Product List
                  </Text>

                  <Flex justifyContent="center" mt="2" mb="2">
                    <button
                      className="btn btn-green"
                      onClick={() => downloadTemplate("productList")}
                    >
                      Download Template
                    </button>
                    <input
                      type="file"
                      id="productListUpload"
                      onChange={(e) =>
                        handleFileUpload(e, setProductListFileName)
                      }
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="productListUpload"
                      className="btn btn-alt ml-2"
                      style={{ cursor: "pointer" }}
                    >
                      Upload Data
                    </label>
                  </Flex>
                  {productListFileName && (
                    <Text className="filename" color="green">
                      {productListFileName} has been uploaded
                    </Text>
                  )}
                  <hr />

                  <Text fontWeight="700" mt="2">
                    Stock position
                  </Text>

                  <Flex justifyContent="center" mt="2" mb="2">
                    <button
                      className="btn btn-green"
                      onClick={() => downloadTemplate("StockPosition")}
                    >
                      Download Template
                    </button>
                    <input
                      type="file"
                      id="stockPositionUpload"
                      onChange={(e) => handleFileUpload(e, setStockFileName)}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="stockPositionUpload"
                      className="btn btn-alt ml-2"
                      style={{ cursor: "pointer" }}
                    >
                      Upload Data
                    </label>
                  </Flex>
                  {stockFileName && (
                    <Text className="filename" color="green">
                      {stockFileName} has been uploaded
                    </Text>
                  )}
                  <hr />

                  <Text fontWeight="700" mt="2">
                    Batch details
                  </Text>

                  <Flex justifyContent="center" mt="2" mb="2">
                    <button
                      className="btn btn-green"
                      onClick={() => downloadTemplate("batchDetails")}
                    >
                      Download Template
                    </button>
                    <input
                      type="file"
                      id="batchDetailsUpload"
                      onChange={(e) =>
                        handleFileUpload(e, setBatchDetailsFileName)
                      }
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="batchDetailsUpload"
                      className="btn btn-alt ml-2"
                      style={{ cursor: "pointer" }}
                    >
                      Upload Data
                    </label>
                  </Flex>
                  {batchDetailsFileName && (
                    <Text className="filename" color="green">
                      {batchDetailsFileName} has been uploaded
                    </Text>
                  )}
                  <hr />
                </Box>
              </ModalBody>

              <ModalFooter>
                <button className="btn btn-green">Submit</button>
              </ModalFooter>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
