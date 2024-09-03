import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import tableSession from "../../../../variables/tableSessions";
import tableSpotCheck from "@/variables/tableSpotCheck";
import {
  Box,
  Input,
  Select as ChakraSelect,
  SimpleGrid,
  Text,
  useDisclosure,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Card from "@/components/card/Card";
import Subsession from "../../../../admin-components/Subsession";
import SpotSubsession from "@/admin-components/SpotSubsession";
import Select, { SingleValue } from "react-select";
import Status from "@/components/status/Status";

interface Session {
  id: number;
  name: string;
  status: string;
  date: string;
}

interface SessionPageProps {
  session: Session | null;
}

type Warehouse = {
  value: string;
  label: string;
};
type CountLead = {
  value: string;
  label: string;
};

const SessionPage = ({ session }: SessionPageProps) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  const {
    isOpen: isOpenConfigModal,
    onOpen: onOpenConfigModal,
    onClose: onCloseConfigModal,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();
  const {
    isOpen: isOpenAddSessionModal,
    onOpen: onOpenAddSessionModal,
    onClose: onCloseAddSessionModal,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();

  const {
    isOpen: isOpenSpotCheckModal,
    onOpen: onOpenSpotCheckModal,
    onClose: onCloseSpotCheckModal,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useDisclosure();

  const {
    isOpen: isOpenSpotSessionModal,
    onOpen: onOpenSpotSessionModal,
    onClose: onCloseSpotSessionModal,
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
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Session || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Card>
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" mr="3">
            {session.name}
          </Text>
          <Status status={session.status} />
        </Flex>
        <Text>Type: <strong>Spot Count Session</strong></Text>
        <Text>Start Date: {session.date}</Text>

        <Flex>
          <Box mt="3">
            <button className="btn btn-green" onClick={onOpenConfigModal}>
              View Config Data
            </button>
          </Box>

          <Box mt="3">
            <button className="btn btn-alt ml-2" onClick={onOpenFinalize}>
              Finalize Session
            </button>
          </Box>
        </Flex>
      </Card>

      <Card mt="3">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Spot Session -
          </Text>

          <button
            className="btn btn-green ml-2"
            onClick={onOpenSpotCheckModal}
          >
            Add Subsession
          </button>
        </Flex>

        <SimpleGrid mt="3" columns={{ base: 1, md: 2 }} spacing={5}>
          <SpotSubsession />
        </SimpleGrid>
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

      <Modal
        isOpen={isOpenAddSessionModal}
        onClose={onCloseAddSessionModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Subsession</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid spacing={3} columns={2} mb="3">
              <Input placeholder="Subsession name" size="md" type="text" />
              <Select
                options={warehouses}
                value={selectedWarehouse}
                onChange={(option) => handleSelectChange(option, "warehouse")}
                placeholder="Select warehouse"
              />

              <Select
                options={countLeads}
                value={selectedCountLead}
                onChange={(option) => handleSelectChange(option, "countLead")}
                placeholder="Select count lead"
              />

              <Input placeholder="Select Date" size="md" type="date" />

              <ChakraSelect placeholder="Product type">
                <option value="option1">Raw materials</option>
                <option value="option2">Finished goods</option>
              </ChakraSelect>

              {/* <ChakraSelect placeholder="Parameter in use">
                <option value="option1">Material Number</option>
                <option value="option2">Description</option>
              </ChakraSelect> */}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-green">Add</button>
            <button
              className="btn btn-ghost ml-2"
              onClick={onCloseAddSessionModal}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenSpotCheckModal}
        onClose={onCloseSpotCheckModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Subsession</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid spacing={3} columns={2} mb="3">
              <Input placeholder="Subsession name" size="md" type="text" />
              <Select
                options={warehouses}
                value={selectedWarehouse}
                onChange={(option) => handleSelectChange(option, "warehouse")}
                placeholder="Select warehouse"
              />

              <Select
                options={countLeads}
                value={selectedCountLead}
                onChange={(option) => handleSelectChange(option, "countLead")}
                placeholder="Select count lead"
              />

              <Input placeholder="Select Date" size="md" type="date" />

              {/* <ChakraSelect placeholder="Product type">
                <option value="option1">Raw materials</option>
                <option value="option2">Finished goods</option>
              </ChakraSelect> */}

  
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-green">Add</button>
            <button
              className="btn btn-ghost ml-2"
              onClick={onCloseSpotCheckModal}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenSpotSessionModal}
        onClose={onCloseSpotSessionModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add line items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid spacing={3} columns={2} mb="3">
              <Input placeholder="Subsession name" size="md" type="text" />
              <Select
                options={warehouses}
                value={selectedWarehouse}
                onChange={(option) => handleSelectChange(option, "warehouse")}
                placeholder="Select warehouse"
              />

              <Select
                options={countLeads}
                value={selectedCountLead}
                onChange={(option) => handleSelectChange(option, "countLead")}
                placeholder="Select count lead"
              />

              <Input placeholder="Product name" size="md" type="text" />

              <ChakraSelect placeholder="Product type">
                <option value="option1">Raw materials</option>
                <option value="option2">Finished goods</option>
              </ChakraSelect>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-green">Add</button>
            <button
              className="btn btn-ghost ml-2"
              onClick={onCloseSpotSessionModal}
            >
              Close
            </button>
          </ModalFooter>
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
                Do you want to finalize this session? Proceeding will close
                every subsession within.
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

export default SessionPage;
