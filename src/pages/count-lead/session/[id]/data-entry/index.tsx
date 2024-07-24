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
import Card from "@/components/card/Card";
import Select, { SingleValue } from "react-select";
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
import ReconTable from "@/admin-components/ReconTable";
import tableRecon from "@/variables/tableRecon";

type Description = {
  value: string;
  label: string;
};

type StorageLocation = {
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

  const storageLocations: StorageLocation[] = [
    { value: "storageLocation1", label: "SL001" },
    { value: "storageLocation2", label: "SL002" },
    { value: "storageLocation3", label: "SL003" },
    { value: "storageLocation4", label: "SL004" },
    { value: "storageLocation5", label: "SL005" },
  ];

  const [selectedDescription, setSelectedDescription] =
    useState<SingleValue<Description>>(null);
  const [selectedStorageLocation, setSelectedStorageLocation] =
    useState<SingleValue<StorageLocation>>(null);

  const handleSelectChange = (
    selectedOption: SingleValue<Description | StorageLocation>,
    selectType: "description" | "storageLocation"
  ) => {
    if (selectType === "description") {
      setSelectedDescription(selectedOption as SingleValue<Description>);
    } else if (selectType === "storageLocation") {
      setSelectedStorageLocation(selectedOption as SingleValue<StorageLocation>);
    }
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

  const defaultValues = {
    materialNumber: "MAT677112",
    packSize: "",
    cartonSize: "22",
    unitOfMeasurements: "Pack",
    batchNumber: "",
    expiryDate: "",
    packQuantity: "",
    cartonQuantity: "",
    total: "30",
    remark: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
      setEditIndex(null);
    } else {
      setTableData([...tableData, formData]);
    }
    setFormData(defaultValues);
  };

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };


  // const [data, setData] = useState(entries);
  const [globalFilter, setGlobalFilter] = useState("");

  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     globalFilter,
  //   },
  //   onGlobalFilterChange: setGlobalFilter,
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // });

  const [isReconVisible, setIsReconVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleReconciliationStart = () => {
    setIsReconVisible(true);
    setIsButtonDisabled(true);
  };
  
  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Data Entry || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Flex justifyContent="end">
        <Box>
          <button
            className="btn btn-green"
            onClick={handleReconciliationStart}
            disabled={isButtonDisabled}
          >
            Start Reconciliation
          </button>
        </Box>
      </Flex>

      <Card mt="3">
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
                onChange={(option) => handleSelectChange(option, "description")}
                // placeholder=""
              />
            </FormControl>
            <FormControl>
              <FormLabel>Material Number</FormLabel>
              <Input
                name="materialNumber"
                value={formData.materialNumber}
                onChange={handleChange}
                // placeholder="MAT677112"
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pack Size</FormLabel>
              <Input
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Carton Size</FormLabel>
              <Input name="cartonSize" value={formData.cartonSize} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Storage Location</FormLabel>
              <Select
                options={storageLocations}
                value={selectedStorageLocation}
                onChange={(option) =>
                  handleSelectChange(option, "storageLocation")
                }
                // placeholder=""
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
                type="date"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Carton Quantity</FormLabel>
              <Input
                name="cartonQuantity"
                value={formData.cartonQuantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pack Quantity</FormLabel>
              <Input
                name="packQuantity"
                value={formData.packQuantity}
                onChange={handleChange}
                readOnly
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
            <button className="btn btn-green" type="submit">
              Save
            </button>
          </Flex>
        </form>
      </Card>

      {!isReconVisible && (
        <Card mt={4} className="overflow-scroll">
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb="2">
              View data
            </Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>Material Number</Th>
                  <Th>Pack Size</Th>
                  <Th>Carton Size</Th>
                  <Th>Unit of Measurements</Th>
                  <Th>Batch Number</Th>
                  <Th>Expiry Date</Th>
                  <Th>Pack Quantity</Th>
                  <Th>Carton Quantity</Th>
                  <Th>Total</Th>
                  <Th>Remark</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((data, index) => (
                  <Tr key={index}>
                    <Td>{data.materialNumber}</Td>
                    <Td>{data.packSize}</Td>
                    <Td>{data.cartonSize}</Td>
                    <Td>{data.unitOfMeasurements}</Td>
                    <Td>{data.batchNumber}</Td>
                    <Td>{data.expiryDate}</Td>
                    <Td>{data.packQuantity}</Td>
                    <Td>{data.cartonQuantity}</Td>
                    <Td>{data.total}</Td>
                    <Td>{data.remark}</Td>
                    <Td>
                      <button
                        className="btn btn-text green"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-text red"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Card>
      )}

      {isReconVisible && (
        <Box mt="3">
          <ReconTable tableData={tableRecon} />
        </Box>
      )}
    </Box>
  );
};

export default DataEntry;
