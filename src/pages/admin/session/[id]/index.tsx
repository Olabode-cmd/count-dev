import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import tableSession from "../../variables/tableSessions";
import {
  Box,
  Input,
  Select,
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
import Subsession from "../../components/Subsession";

interface Session {
  id: number;
  name: string;
  status: string;
  date: string;
}

interface SessionPageProps {
  session: Session | null;
}

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

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Session || Count Warehouse Manager</title>
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

        <Box mt="3">
          <button className="btn btn-green" onClick={onOpenConfigModal}>
            View Config Data
          </button>
        </Box>
      </Card>

      <Card mt="3">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Subsessions -
          </Text>

          <button
            className="btn btn-green ml-2"
            onClick={onOpenAddSessionModal}
          >
            Add Subsession
          </button>
        </Flex>

        <SimpleGrid mt='3' columns={{ base: 1, md: 2 }} spacing={5}>
            <Subsession />
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

      <Modal isOpen={isOpenAddSessionModal} onClose={onCloseAddSessionModal} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Subsession</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid spacing={3} columns={2} mb="3">
              <Input placeholder="Subsession name" size="md" type="text" />
              <Select placeholder="Select Warehouse">
                <option value="option1">Ojo Major Stores</option>
                <option value="option2">Ikeja Stores</option>
                <option value="option3">Igando Warehouse Branch</option>
              </Select>

              <Select placeholder="Select Count Lead">
                <option value="option1">Mr John</option>
                <option value="option2">Jane Doe</option>
                <option value="option3">Emily Doe</option>
              </Select>

              <Input placeholder="Select Date" size="md" type="date" />

              <Select placeholder="Product type">
                <option value="option1">Raw materials</option>
                <option value="option2">Finished goods</option>
              </Select>

              <Select placeholder="Count parameter">
                <option value="option1">Material Number</option>
                <option value="option2">Description</option>
              </Select>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <button className='btn btn-green'>Add</button>
            <button className="btn btn-ghost ml-2" onClick={onCloseAddSessionModal}>
              Close
            </button>
          </ModalFooter>
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
