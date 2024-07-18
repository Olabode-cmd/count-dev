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
  Select,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { MdFileCopy } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { useRouter } from "next/router";
import { TiLockClosed } from "react-icons/ti";
import { RiVoiceRecognitionLine } from "react-icons/ri";

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
            <MenuItem
              onClick={handleReconciliation}
              icon={<RiVoiceRecognitionLine />}
            >
              Start Reconciliation
            </MenuItem>
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
                  <Select>
                    <option value="option1" selected>
                      Ojo Major Stores
                    </option>
                    <option value="option2">Ikeja Stores</option>
                    <option value="option3">Igando Warehouse Branch</option>
                  </Select>
                </Box>

                <Box>
                  <Text mt="2" mb="1">
                    Count Lead
                  </Text>
                  <Select>
                    <option value="option1">Mr John</option>
                    <option value="option2">Jane Doe</option>
                    <option value="option3" selected>
                      Emily Doe
                    </option>
                  </Select>
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
                  <Select>
                    <option value="option1">Raw materials</option>
                    <option value="option2" selected>
                      Finished goods
                    </option>
                  </Select>
                </Box>

                <Box>
                  <Text mt="2" mb="1">
                    Parameter in use
                  </Text>
                  <Select>
                    <option value="option1">Material Number</option>
                    <option value="option2" selected>
                      Description
                    </option>
                  </Select>
                </Box>
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
