import {
  Box,
  Text,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import TotalData from "../../../admin-components/TotalData";
import Head from "next/head";

const ControllerDashboard = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Controller Dashboard</title>
        <meta name="description" />
      </Head>

      <Box mt="3">
        <TotalData />
      </Box>
    </Box>
  );
};

export default ControllerDashboard;