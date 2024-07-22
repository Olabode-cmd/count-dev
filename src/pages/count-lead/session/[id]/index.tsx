import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import tableSession from "../../../../variables/tableSessions";
import {
  Box,
  Input,
  Select as ChakraSelect,
  SimpleGrid,
  Text,
  useDisclosure,
  Flex,
  Tag,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Card from "@/components/card/Card";
import Select, { MultiValue } from "react-select";
import Counter from "@/count-components/Counters";
import tableSubsession from "@/variables/tableSubsession";
import Status from "@/components/status/Status";
import { FaTrash } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import { MdLock } from "react-icons/md";

interface Session {
  id: number;
  name: string;
  session: string;
  status: string;
  date: string;
}
type Counter = {
  value: string;
  label: string;
};

const ViewSessionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const subsessionID = Number(id);

  // Find the subsession with the given ID
  const subsession = tableSubsession.find((item) => item.id === subsessionID);

  if (!subsession) {
    return (
      <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
        <Text>No subsession found with ID: {id}</Text>
      </Box>
    );
  }

  const {
    isOpen: isOpenConfigModal,
    onOpen: onOpenConfigModal,
    onClose: onCloseConfigModal,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();
  const {
    isOpen: isOpenAssignModal,
    onOpen: onOpenAssignModal,
    onClose: onCloseAssignModal,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();

  const {
    isOpen: isOpenFinalize,
    onOpen: onOpenFinalize,
    onClose: onCloseFinalize,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sessions, setSessions] = useState<number[]>([0]);

  const addSession = () => {
    setSessions([...sessions, sessions.length]);
  };

  const removeSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const downloadTemplate = (templateName: string) => {
    const templates: { [key: string]: string } = {
      productList: "/ProductList.xlsx",
      stockPosition: "/StockPosition.xlsx",
      batchDetails: "/BatchDetails.xlsx",
    };

    const link = document.createElement("a");
    link.href = templates[templateName];
    link.download = templates[templateName];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const counters: Counter[] = [
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedCounters, setSelectedCounters] = useState<MultiValue<Counter>>(
    []
  );

  const handleChange = (selectedOptions: MultiValue<Counter>) => {
    setSelectedCounters(selectedOptions);
  };

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Subsession details || Count Lead</title>
        <meta name="description" />
      </Head>

      <Card>
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" mr="3">
            {subsession.name}
          </Text>
          <Status status={subsession.status} />
        </Flex>

        <Text mt="3">Main session: {subsession.session}</Text>
        <Text>Subsession Start Date: {subsession.date}</Text>

        <Flex mt="3">
          <button className="btn btn-green" onClick={onOpenConfigModal}>
            View Config Data
          </button>
        </Flex>
      </Card>

      <Card mt="3">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Counters
          </Text>

          <button className="btn btn-green ml-2" onClick={onOpenAssignModal}>
            Assign Counters
          </button>
        </Flex>

        <SimpleGrid mt="3" columns={{ base: 1, md: 2 }} spacing={5}>
          <Counter />
        </SimpleGrid>
      </Card>

      <Card mt="3">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Data Entry:
          </Text>
          <button className="btn btn-green ml-2 mr-2">Start Data Entry</button>
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
              <MenuItem icon={<MdLock />} onClick={onOpenFinalize}>
                Finalize Subsession
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Card>

      <Modal isOpen={isOpenConfigModal} onClose={onCloseConfigModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Config Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" direction="column">
              <Box>
                <button
                  className="btn btn-green"
                  onClick={() => downloadTemplate("productList")}
                >
                  View Product List table
                </button>
              </Box>

              <hr className="w-100 mb-2 mt-2" />

              <Box>
                <button
                  className="btn btn-green"
                  onClick={() => downloadTemplate("stockPosition")}
                >
                  View Stock Position table
                </button>
              </Box>

              <hr className="w-100 mb-2 mt-2" />

              <Box>
                <button
                  className="btn btn-green"
                  onClick={() => downloadTemplate("batchDetails")}
                >
                  View Batch Details table
                </button>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-ghost" onClick={onCloseConfigModal}>
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenAssignModal} onClose={onCloseAssignModal}>
        <ModalOverlay />
        <ModalContent>
          <Box>
            <ModalHeader>Assign Counters</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Box>
                <Text mb='3'>Upload mass amount of counters data already assigned to their storage locations.</Text>
                <Flex mb='3' justifyContent='center'>
                  <button className='btn btn-alt'>Download Template</button>
                  <button className='btn btn-green ml-2'>Upload</button>
                </Flex>

                <hr />
                <Text mt='3'>Select counter</Text>
                <ChakraSelect>
                  <option value="option1">John Doe</option>
                  <option value="option2">Jane Doe</option>
                  <option value="option3">Mary Doe</option>
                </ChakraSelect>
              </Box>
              <Box mt="3">
                <Text>Alt counter (optional)</Text>
                <ChakraSelect placeholder="Select alt counter">
                  <option value="option1">John Doe</option>
                  <option value="option2">Jane Doe</option>
                  <option value="option3">Mary Doe</option>
                </ChakraSelect>
              </Box>
              <Box mt="3">
                <Text>Assign storage location to counter</Text>
                <Select
                  isMulti
                  options={counters}
                  value={selectedCounters}
                  onChange={handleChange}
                  placeholder="Select storage locations..."
                />
              </Box>
              <Box mt="3">
                <Text>Parameter in use</Text>
                <ChakraSelect placeholder="Select parameter for data entry">
                  <option value="option1">Description</option>
                  <option value="option2">Material Number</option>
                </ChakraSelect>
              </Box>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-green">Add</button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenFinalize} onClose={onCloseFinalize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm choice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <Text fontSize="lg" mt="2">
                Do you want to finalize this subsession? Proceeding will close
                it and you won&apos;t be allowed to make changes unless reopened
                by the Warehouse Manager
              </Text>

              <Flex mt="5" mb="4" justifyContent="center">
                <Flex>
                  <button className="btn btn-alt" onClick={onCloseFinalize}>
                    No, go back
                  </button>
                  <button className="btn btn-green ml-2">Yes, do it</button>
                </Flex>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tableSession.map((session) => ({
    params: { id: session.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const session =
    tableSession.find((session) => session.id.toString() === id) || null;

  return {
    props: {
      session,
    },
    revalidate: 10,
  };
};

export default ViewSessionPage;
