// pages/admin/index.tsx
import {
  Box,
  Flex,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import SessionTable from "../components/SessionTable";
import tableSession from "../variables/tableSessions";

const CountSession = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Session || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>
      <Box pt={{ base: "40px", md: "30px", xl: "30px" }}>
        <Flex justifyContent="end">
          <button className="btn btn-green" onClick={onOpen}>
            Create Session
          </button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Count Session</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
                <Input placeholder="Session name" mb="4" />
                <Text>Session start date:</Text>
                <Input type="date" mb="2" />
              </ModalBody>

              <ModalFooter>
                <button className="btn btn-green">Create</button>
                <button className="btn btn-ghost" onClick={onClose}>
                  Close
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Box mt="3">
          <SessionTable tableData={tableSession} />
        </Box>
      </Box>
    </Box>
  );
};

export default CountSession;