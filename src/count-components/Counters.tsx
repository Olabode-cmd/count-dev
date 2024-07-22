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
import Select, { MultiValue } from "react-select";
import { TiLockClosed } from "react-icons/ti";
import { RiVoiceRecognitionLine } from "react-icons/ri";

type StorageLocation = {
  value: string;
  label: string;
};

export default function Counter() {
  const router = useRouter();
  const { id } = router.query;
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

  const storageLocations: StorageLocation[] = [
    { value: "counter1", label: "SL001" },
    { value: "counter2", label: "SL002" },
    { value: "counter3", label: "SL003" },
    { value: "counter4", label: "SL004" },
    { value: "counter5", label: "SL005" },
    { value: "counter6", label: "SL006" },
    { value: "counter7", label: "SL007" },
    { value: "counter8", label: "SL008" },
    { value: "counter9", label: "SL009" },
  ];

  const defaultOptions = [
    { value: "counter2", label: "SL002" },
    { value: "counter3", label: "SL003" },
    { value: "counter4", label: "SL004" },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedStorageLocations, setSelectedStorageLocations] = useState<MultiValue<StorageLocation>>(
    []
  );

  const handleChange = (selectedOptions: MultiValue<StorageLocation>) => {
    setSelectedStorageLocations(selectedOptions);
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
          Edit Storage Locations
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
            <MenuItem onClick={onOpenDelete} color="red" icon={<FaTrash />}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={isOpenEditModal} onClose={onCloseEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Storage Locations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text mb="1">Storage locations</Text>
              <Select
                isMulti
                options={storageLocations}
                value={selectedStorageLocations}
                onChange={handleChange}
                defaultValue={defaultOptions}
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