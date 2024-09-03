// @ts-nocheck
import { useRouter } from "next/router";
import Link from "next/link";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
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

interface ItemProps {
  description: Description;
  // onNavigate: (value: string) => void;
}


const CountPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const descriptions: Description[] = [
    { value: "pain-reliever-tablets", label: "Pain Reliever Tablets" },
    { value: "energy-drink", label: "Energy Drink" },
    { value: "antibiotic-syrup", label: "Antibiotic Syrup" },
    { value: "snack-bars", label: "Snack Bars" },
    { value: "vitamin-c-supplements", label: "Vitamin C Supplements" },
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
      setSelectedStorageLocation(
        selectedOption as SingleValue<StorageLocation>
      );
    }
  };

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

  const [isReconVisible, setIsReconVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleReconciliationStart = () => {
    setIsReconVisible(true);
    setIsButtonDisabled(true);
  };

  // const handleNavigate = (value: string) => {
  //   router.push(`/controller/spot-session/data-count/count`);
  // };

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Data Count || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Card>
        <Text fontSize="xl" fontWeight="bold">
          Pain reliever tablets
        </Text>

        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3} mt="3">
            <FormControl>
              <FormLabel>Storage Location</FormLabel>
              <Select
                options={storageLocations}
                value={selectedStorageLocation}
                onChange={(option) =>
                  handleSelectChange(option, "storageLocation")
                }
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
              <FormLabel>Quantity</FormLabel>
              <Input
                name="cartonQuantity"
                value={formData.cartonQuantity}
                onChange={handleChange}
              />
            </FormControl>
          </SimpleGrid>

          <Flex mt="3">
            <button className="btn btn-green" type="submit">
              Add
            </button>
          </Flex>
        </form>
      </Card>

      <Card mt={4} className="overflow-scroll">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            View data
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Batch Number</Th>
                <Th>Expiry Date</Th>
                <Th>Storage Location</Th>
                <Th>Quantity</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((data, index) => (
                <Tr key={index}>
                  <Td>{data.batchNumber}</Td>
                  <Td>{data.expiryDate}</Td>
                  <Td>{data.storageLocation}</Td>
                  <Td>{data.cartonQuantity}</Td>
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
    </Box>
  );
};

export default CountPage;