// @ts-nocheck
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Input,
  SimpleGrid,
  Text,
  FormControl,
  FormLabel,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import Card from "@/components/card/Card";
import Head from "next/head";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { EntryType } from "perf_hooks";

type Description = {
  value: string;
  label: string;
};

const DataEntry = () => {
  const router = useRouter();
  const { id } = router.query;

  const descriptions: Description[] = [
    { value: "description1", label: "Pain Reliever Tablets" },
    { value: "description2", label: "Energy Drink" },
    { value: "description3", label: "Antibiotic Syrup" },
    { value: "description4", label: "Snack Bars" },
    { value: "description5", label: "Vitamin C Supplements" },
  ];

  const [selectedDescription, setSelectedDescription] =
    useState<SingleValue<Description>>(null);

  const handleSelectChange = (selectedOption: SingleValue<Description>) => {
    setSelectedDescription(selectedOption);
  };

  const [formData, setFormData] = useState({
    materialNumber: "",
    packSize: "",
    cartonSize: "22",
    storageLocation: "",
    unitOfMeasurements: "Pack",
    batchNumber: "",
    expiryDate: "",
    packQuantity: "",
    total: "30",
    remark: "",
  });

  const [entries, setEntries] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const entryData = {
      ...formData,
      description: selectedDescription ? selectedDescription.label : "",
    };
    if (editingIndex !== null) {
      const updatedEntries = entries.map((entry, index) =>
        index === editingIndex ? entryData : entry
      );
      setEntries(updatedEntries);
      setEditingIndex(null); // Reset the editing index
    } else {
      setEntries([...entries, entryData]);
    }
    setFormData({
      materialNumber: "",
      packSize: "",
      cartonSize: "22",
      storageLocation: "",
      unitOfMeasurements: "Pack",
      batchNumber: "",
      expiryDate: "",
      packQuantity: "",
      total: "30",
      remark: "",
    });
    setSelectedDescription(null);
    setEditingIndex(null); // Reset the editing index here as well
  };

  // const handleEdit = (index: number) => {
  //   const entry = entries[index];
  //   setFormData({
  //     materialNumber: entry.materialNumber,
  //     packSize: entry.packSize,
  //     cartonSize: entry.cartonSize,
  //     storageLocation: entry.storageLocation,
  //     unitOfMeasurements: entry.unitOfMeasurements,
  //     batchNumber: entry.batchNumber,
  //     expiryDate: entry.expiryDate,
  //     packQuantity: entry.packQuantity,
  //     total: entry.total,
  //     remark: entry.remark,
  //   });
  //   setSelectedDescription(
  //     descriptions.find((d) => d.label === entry.description)
  //   );
  //   setEntries(entries.filter((_, i) => i !== index));
  //   setEditingIndex(index);
  // };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("materialNumber", { header: "Material Number" }),
    columnHelper.accessor("packSize", { header: "Pack Size" }),
    columnHelper.accessor("storageLocation", { header: "Storage Location" }),
    columnHelper.accessor("batchNumber", { header: "Batch Number" }),
    columnHelper.accessor("expiryDate", { header: "Expiry Date" }),
    columnHelper.accessor("packQuantity", { header: "Pack Quantity" }),
    columnHelper.accessor("remark", { header: "Remark" }),
  ];

  const [data, setData] = useState(entries);
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
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Data Entry || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Card>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Data Entry for Session {id}
            </Text>
          </Box>
        </Flex>

        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3} mt="3">
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Select
                options={descriptions}
                value={selectedDescription}
                onChange={handleSelectChange}
                placeholder=""
              />
            </FormControl>
            <FormControl>
              <FormLabel>Material Number</FormLabel>
              <Input
                name="materialNumber"
                value={formData.materialNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pack Size</FormLabel>
              <Input
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Carton Size</FormLabel>
              <Input name="cartonSize" value={formData.cartonSize} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Storage Location</FormLabel>
              <Input
                name="storageLocation"
                value={formData.storageLocation}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Unit of Measurements</FormLabel>
              <Input
                name="unitOfMeasurements"
                value={formData.unitOfMeasurements}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Batch Number</FormLabel>
              <Input
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pack Quantity</FormLabel>
              <Input
                name="packQuantity"
                value={formData.packQuantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total</FormLabel>
              <Input name="total" value={formData.total} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Remark</FormLabel>
              <Input
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              />
            </FormControl>
          </SimpleGrid>

          <Flex mt="3">
            <button onSubmit={handleSubmit} className="btn btn-green">
              Save
            </button>
          </Flex>
        </form>
      </Card>

      <Card mt={4} className="overflow-scroll">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            View data
          </Text>

          <Input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            mb={4}
            width={{ base: "100%", md: "25%" }}
          />
          <Table>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex mt={4} alignItems="center">
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
            {/* <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select> */}
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export default DataEntry;
