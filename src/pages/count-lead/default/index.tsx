import { Box, Text, SimpleGrid, Icon, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "@/components/card/MiniStatistics";
import IconBox from "@/components/icons/IconBox";
import {
  MdAddTask,
  MdBarChart,
  MdOutlineCardGiftcard,
  MdSupervisedUserCircle,
} from "react-icons/md";

import Head from "next/head";
import SessionTable from "@/count-components/SessionTable";
import tableSession from "@/variables/tableSessions";

const CountDashboard = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Lead Dashboard || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Box mt="3">
        <SessionTable tableData={tableSession} />
      </Box>
    </Box>
  );
};

export default CountDashboard;