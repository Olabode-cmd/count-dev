import {
  Box,
  Text,
  useColorModeValue,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import Card from "@/components/card/Card";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import tableSubsessions from "@/variables/tableSubsession";
import Status from "@/components/status/Status";

type RowObj = {
  id: number;
  name: string;
  session: string;
  status: string;
  date: string;
};

const CountLeadSession = () => {
  const router = useRouter();

  const viewSubsession = (id: any) => {
    router.push(`/count-lead/session/${id}`);
  };

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [subsessionID, setSubsessionID] = useState<string>("");
  const [searchedSubsession, setSearchedSubsession] = useState<RowObj | null>(
    null
  );
  const [isSubsessionVisible, setIsSubsessionVisible] =
    useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubsessionID(e.target.value);
  };

  const showSubsessionResult = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for subsessionID:", subsessionID); // Debugging line
    const result = tableSubsessions.find(
      (tableSubsession) => tableSubsession.id === Number(subsessionID)
    );
    console.log("Search result:", result); // Debugging line
    setSearchedSubsession(result ?? null); // Set null if result is undefined
    setIsSubsessionVisible(true);
  };

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Lead Dashboard || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Card mt="3">
        <Text fontSize="xl" fontWeight="bold">
          Subsession IDs
        </Text>

        <form onSubmit={showSubsessionResult}>
          <FormControl mb="2">
            <FormLabel>Enter Subsession ID to search</FormLabel>
            <Input
              width={{ base: "100%", md: "50%", lg: "50%" }}
              onChange={handleChange}
              value={subsessionID}
            />
          </FormControl>
          <button className="btn btn-green" type="submit">
            Search
          </button>
        </form>
      </Card>

      {!isSubsessionVisible && (
        <Box mt="4" textAlign="center">
          <Text>No search results yet.</Text>
        </Box>
      )}
      {isSubsessionVisible && (
        <Card mt="4">
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Main Session</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchedSubsession ? (
                <Tr>
                  <Td>{searchedSubsession.id}</Td>
                  <Td>{searchedSubsession.name}</Td>
                  <Td>
                    <Status status={searchedSubsession.status} />
                  </Td>
                  <Td>{searchedSubsession.session}</Td>
                  <Td>
                    <button
                      className="btn btn-green"
                      onClick={() => viewSubsession(searchedSubsession.id)}
                    >
                      View Subsession
                    </button>
                  </Td>
                </Tr>
              ) : (
                <Tr>
                  <Td>No subsession found</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Card>
      )}
    </Box>
  );
};

export default CountLeadSession;
