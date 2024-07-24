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
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tfoot,
} from "@chakra-ui/react";
import Head from "next/head";
import SessionTable from "../../../admin-components/SessionTable";
import tableOneSession from "../../../variables/tableOneSession";
import Card from "@/components/card/Card";
import Status from "@/components/status/Status";

const CountSession = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const {
    isOpen: isOpenCountSession,
    onOpen: onOpenCountSession,
    onClose: onCloseCountSession,
  } = useDisclosure();

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Session || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>
      <Box>
        <Flex justifyContent="end">
          <button className="btn btn-green" onClick={onOpenCountSession}>
            Create Session
          </button>

          <Modal isOpen={isOpenCountSession} onClose={onCloseCountSession}>
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
                <button className="btn btn-ghost" onClick={onCloseCountSession}>
                  Close
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Card mt="3">
          <Text fontSize="xl" fontWeight="bold">
            Search session and subsession IDs
          </Text>

          <form>
            <FormControl mb="2">
              <FormLabel>Enter ID to search</FormLabel>
              <Input width={{ base: "100%", md: "50%", lg: "50%" }} />
            </FormControl>
            <button className="btn btn-green" type="submit">
              Search
            </button>
          </form>
        </Card>

        <Box mt="3">
          <SessionTable tableData={tableOneSession} />
        </Box>
      </Box>
    </Box>
  );
};

export default CountSession;
