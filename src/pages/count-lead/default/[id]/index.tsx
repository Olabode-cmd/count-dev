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
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Card from "@/components/card/Card";
import Select, { MultiValue } from "react-select";
import Counter from "@/count-components/Counters";

interface Session {
  id: number;
  name: string;
  status: string;
  date: string;
}
type Counter = {
  value: string;
  label: string;
};

interface ViewSessionPageProps {
  session: Session | null;
}

const ViewSessionPage = ({ session }: ViewSessionPageProps) => {
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
    isOpen: isOpenAssignModal,
    onOpen: onOpenAssignModal,
    onClose: onCloseAssignModal,
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

  //    Status Tag
  const status = session.status;

  let bgColor, textColor;

  switch (status) {
    case "Upcoming":
      bgColor = "#cbdaf5";
      textColor = "#1156d6";
      break;
    case "Ongoing":
      bgColor = "#d3d3d3";
      textColor = "#000000";
      break;
    case "Closed":
      bgColor = "#ffe6e6";
      textColor = "#ff0000";
      break;
    case "Completed":
      bgColor = "#e6ffe7";
      textColor = "#0ce917";
      break;
    default:
      bgColor = "#ffffff";
      textColor = "#000000";
      break;
  }

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
          <Text fontSize="2xl" fontWeight="bold">
            {session.name}
          </Text>
          <Tag
            bg={bgColor}
            color={textColor}
            fontSize="sm"
            fontWeight="500"
            ml="3"
          >
            {session.status}
          </Tag>
        </Flex>
        <Text>Session Start Date: {session.date}</Text>

        <Flex mt="3">
          <button className="btn btn-green" onClick={onOpenConfigModal}>
            View Config Data
          </button>

          <button className="btn btn-green ml-2">
            Start Data Entry
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
                <Text>Select counter</Text>
                <ChakraSelect>
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
                  placeholder="Select counters..."
                />
              </Box>
              <Box mt="3">
                <Text>Alt counter (optional)</Text>
                <ChakraSelect placeholder="Select alt counter">
                  <option value="option1">John Doe</option>
                  <option value="option2">Jane Doe</option>
                  <option value="option3">Mary Doe</option>
                </ChakraSelect>
              </Box>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-green">Add</button>
            </ModalFooter>
          </Box>
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