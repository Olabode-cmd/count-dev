import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select as ChakraSelect,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdFileCopy, MdPlayArrow } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { useRouter } from "next/router";
import { TiLockClosed } from "react-icons/ti";
import Select, { SingleValue } from "react-select";
import Status from "@/components/status/Status";

type Warehouse = {
  value: string;
  label: string;
};
type CountLead = {
  value: string;
  label: string;
};

export default function Subsession() {
  const router = useRouter();
  const { id } = router.query;
  const handleDataEntry = () => {
    router.push(`/admin/session/${id}/data-entry`);
  };
  const handleReconciliation = () => {
    router.push(`/admin/session/${id}/reconciliation`);
  };
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();

  const warehouses: Warehouse[] = [
    { value: "warehouse1", label: "Ojo Warehouse Avenue" },
    { value: "warehouse2", label: "Ikeja Warehouse Center" },
    { value: "warehouse3", label: "Iyana-Iba Store Ltd" },
    { value: "warehouse4", label: "Igando Bar" },
    { value: "warehouse5", label: "Egbeda Supplements" },
  ];
  const countLeads: CountLead[] = [
    { value: "countLead1", label: "John Doe" },
    { value: "countLead2", label: "Sasha Doe" },
    { value: "countLead3", label: "Mary Doe" },
    { value: "countLead4", label: "Matthew Doe" },
    { value: "countLead5", label: "Jean Doe" },
  ];

  const [selectedWarehouse, setSelectedWarehouse] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<SingleValue<Warehouse>>(null);
  const [selectedCountLead, setSelectedCountLead] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<SingleValue<CountLead>>(null);

  const handleSelectChange = (
    selectedOption: SingleValue<Warehouse | CountLead>,
    selectType: "warehouse" | "countLead"
  ) => {
    if (selectType === "warehouse") {
      setSelectedWarehouse(selectedOption as SingleValue<Warehouse>);
    } else if (selectType === "countLead") {
      setSelectedCountLead(selectedOption as SingleValue<CountLead>);
    }
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Text fontWeight="500">Major Ojo Stores: </Text>
        <Button
          onClick={onOpenEditModal}
          size="sm"
          colorScheme="teal"
          variant="outline"
          borderRadius="0px"
          ml="5"
          mr="5"
        >
          Edit
        </Button>

        <Box mr='3'>
          <Status status="Ongoing" />
        </Box>
        <Menu>
          <MenuButton>
            <Button
              colorScheme="gray"
              variant="outline"
              borderRadius="6px"
              p="1"
            >
              <TbDotsVertical />
            </Button>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleDataEntry} icon={<MdFileCopy />}>
              Start Data Entry
            </MenuItem>
            <MenuItem icon={<MdPlayArrow />}>Open Reconciliation</MenuItem>
            <MenuItem icon={<TiLockClosed />}>Close Session</MenuItem>
            <MenuItem color="red" icon={<FaTrash />}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={isOpenEditModal} onClose={onCloseEditModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Subsessions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <SimpleGrid columns={2} spacing={3} mb="3">
                <Box>
                  <Text mt="2" mb="1">
                    Warehouse
                  </Text>
                  <Select
                    options={warehouses}
                    value={selectedWarehouse}
                    onChange={(option) =>
                      handleSelectChange(option, "warehouse")
                    }
                    // placeholder=""
                  />
                </Box>

                <Box>
                  <Text mt="2" mb="1">
                    Count Lead
                  </Text>
                  <Select
                    options={countLeads}
                    value={selectedCountLead}
                    onChange={(option) =>
                      handleSelectChange(option, "countLead")
                    }
                    // placeholder=""
                  />
                </Box>

                <Box>
                  <Text mt="2" mb="1">
                    Date
                  </Text>
                  <Input type="date" defaultValue="2024-06-24" />
                </Box>

                <Box>
                  <Text mt="2" mb="1">
                    Product type
                  </Text>
                  <ChakraSelect>
                    <option value="option1">Raw materials</option>
                    <option value="option2" selected>
                      Finished goods
                    </option>
                  </ChakraSelect>
                </Box>

                {/* <Box>
                  <Text mt="2" mb="1">
                    Parameter in use
                  </Text>
                  <ChakraSelect>
                    <option value="option1">Material Number</option>
                    <option value="option2" selected>
                      Description
                    </option>
                  </ChakraSelect>
                </Box> */}
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-green">Update</button>
            <button className="btn btn-ghost" onClick={onCloseEditModal}>
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
