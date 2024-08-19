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
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { MdFileCopy } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { useRouter } from "next/router";
import Select, { MultiValue, SingleValue } from "react-select";
import { TiLockClosed } from "react-icons/ti";
import { RiVoiceRecognitionLine } from "react-icons/ri";

type StorageLocation = {
  value: string;
  label: string;
};

type Counter = {
  value: string;
  label: string;
};
type AltCounter = {
  value: string;
  label: string;
};

export default function SpotCounter() {
  const router = useRouter();
  const { id } = router.query;

  const handleDataEntry = () => {
    router.push(`/controller/session/${id}/data-count`);
  };
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const storageLocation: StorageLocation[] = [
    { value: "sl1", label: "SL001" },
    { value: "sl2", label: "SL002" },
    { value: "sl3", label: "SL003" },
    { value: "sl4", label: "SL004" },
    { value: "sl5", label: "SL005" },
    { value: "sl6", label: "SL006" },
    { value: "sl7", label: "SL007" },
    { value: "sl8", label: "SL008" },
    { value: "sl9", label: "SL009" },
  ];

  const [selectedStorageLocation, setSelectedStorageLocation] = useState<
    MultiValue<StorageLocation>
  >([]);

  const handleStorageChange = (
    selectedOptions: MultiValue<StorageLocation>
  ) => {
    setSelectedStorageLocation(selectedOptions);
  };

  const counters: Counter[] = [
    { value: "counter1", label: "Mary Doe" },
    { value: "counter2", label: "Sasha Blouse" },
    { value: "counter3", label: "John Doe" },
    { value: "counter4", label: "Jane Doe" },
    { value: "counter5", label: "Angela Brown" },
    { value: "counter6", label: "Gabi Braun" },
    { value: "counter7", label: "Trevor Belmont" },
    { value: "counter8", label: "Vlad Tepes" },
  ];

  const altcounters: AltCounter[] = [
    { value: "counter1", label: "Mary Doe" },
    { value: "counter2", label: "Sasha Blouse" },
    { value: "counter3", label: "John Doe" },
    { value: "counter4", label: "Jane Doe" },
    { value: "counter5", label: "Angela Brown" },
    { value: "counter6", label: "Gabi Braun" },
    { value: "counter7", label: "Trevor Belmont" },
    { value: "counter8", label: "Vlad Tepes" },
  ];

  const [selectedCounter, setSelectedCounter] =
    useState<SingleValue<Counter>>(null);
  const [selectedAltCounter, setSelectedAltCounter] =
    useState<SingleValue<AltCounter>>(null);

  const handleSelectChange = (
    selectedOption: SingleValue<Counter | AltCounter>,
    selectType: "counter" | "altcounter"
  ) => {
    if (selectType === "counter") {
      setSelectedCounter(selectedOption as SingleValue<Counter>);
    } else if (selectType === "altcounter") {
      setSelectedAltCounter(selectedOption as SingleValue<AltCounter>);
    }
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Text fontWeight="500">Mr John Doe: </Text>
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
              Start Data Count
            </MenuItem>
            <MenuItem onClick={onOpenDelete} color="red" icon={<FaTrash />}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={isOpenEditModal} onClose={onCloseEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Spot Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Select counter</Text>
              <Select
                options={counters}
                value={selectedCounter}
                onChange={(option) => handleSelectChange(option, "counter")}
              />
            </Box>
            <Box mt="3">
              <Text>Alt counter (optional)</Text>
              <Select
                options={altcounters}
                value={selectedAltCounter}
                onChange={(option) => handleSelectChange(option, "altcounter")}
              />
            </Box>
            <Box mt="3">
              <Text>Assign product to counter</Text>
              <Select
                isMulti
                options={storageLocation}
                value={selectedStorageLocation}
                onChange={handleStorageChange}
                placeholder="Select products..."
              />
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

      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm choice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <Text fontSize="lg" mt="2">
                Are you sure you want to delete <br /> this counter?
              </Text>

              <Flex mt="5" mb="4" justifyContent="center">
                <Flex>
                  <button className="btn btn-alt" onClick={onCloseDelete}>
                    No, go back
                  </button>
                  <button className="btn btn-red ml-2">
                    Yes, delete counter
                  </button>
                </Flex>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}