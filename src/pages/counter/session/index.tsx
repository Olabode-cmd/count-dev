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
import SessionTable from "@/counter-components/SessionTable";
import tableOneSession from "@/variables/tableOneSession";

type RowObj = {
  id: number;
  name: string;
  session: string;
  status: string;
  date: string;
};

const CounterSession = () => {
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

      <Box mt="3">
        <SessionTable tableData={tableOneSession} />
      </Box>
    </Box>
  );
};

export default CounterSession;
