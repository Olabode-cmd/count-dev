// @ts-nocheck
import {
  Flex,
  Box,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import * as React from "react";
import { useState, useMemo } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { EntryType } from "perf_hooks";
import Card from "@/components/card/Card";

type RowObj = {
  productId: string;
  itemDescription: string;
  uom: string;
  ctnsSize: string;
  costPrice: string;
  batchDetails: string;
  logisticsAreaCode: string;
  countedQuantity: number;
  stockPositionQty: number;
  variance: number;
  expiryDate: string;
  action: any;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ReconTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  let defaultData = tableData;
  const [selectedRow, setSelectedRow] = React.useState<RowObj | null>(null);

  const [withBatchDetails, setWithBatchDetails] = React.useState(false);
  const [withLogistics, setWithLogistics] = React.useState(false);

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("productId", {
          id: "productId",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              PRODUCT ID
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor("itemDescription", {
          id: "itemDescription",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              DESCRIPTION
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor("uom", {
          id: "uom",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              UOM
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor("ctnsSize", {
          id: "ctnsSize",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              CTNS
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor("countedQuantity", {
          id: "countedQuantity",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              COUNTED QUANTITY
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        withBatchDetails &&
          columnHelper.accessor("batchDetails", {
            id: "batchDetails",
            header: () => (
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                BATCH DETAILS
              </Text>
            ),
            cell: (info) => (
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {info.getValue()}
              </Text>
            ),
          }),
        withBatchDetails &&
          columnHelper.accessor("expiryDate", {
            id: "expiryDate",
            header: () => (
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                EXPIRY DATE
              </Text>
            ),
            cell: (info) => (
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {info.getValue()}
              </Text>
            ),
          }),
        withLogistics &&
          columnHelper.accessor("logisticsAreaCode", {
            id: "logisticsAreaCode",
            header: () => (
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                LOGISTICS AREA CODE
              </Text>
            ),
            cell: (info) => (
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {info.getValue()}
              </Text>
            ),
          }),
        columnHelper.accessor("stockPositionQty", {
          id: "stockPositionQty",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              STOCK POSITION QUANTITY
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor("variance", {
          id: "variance",
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            >
              VARIANCE
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
          cell: () => (
            <Box>
              <button className="btn btn-green">Edit</button>
            </Box>
          ),
        }),
      ].filter(Boolean),
    [withBatchDetails, withLogistics, textColor]
  );

  const [data, setData] = React.useState(() => [...defaultData]);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card flexDirection="column" w="100%" px="0px" className="overflow-scroll">
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Product Reconciliation
        </Text>
        <button className="btn btn-green">Generate report</button>
      </Flex>

      <Input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        mb={4}
        ml="4"
        width={{ base: "100%", md: "25%" }}
      />

      <Flex px="25px">
        <Checkbox
          isChecked={withBatchDetails}
          onChange={() => setWithBatchDetails(!withBatchDetails)}
        >
          With Batch details
        </Checkbox>
        <Checkbox
          ml="4"
          isChecked={withLogistics}
          onChange={() => setWithLogistics(!withLogistics)}
        >
          With Logistics
        </Checkbox>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex mt={4} ml="4" alignItems="center">
          <button
            className="btn btn-green"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="btn btn-green ml-2 mr-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </Flex>
      </Box>
    </Card>
  );
};