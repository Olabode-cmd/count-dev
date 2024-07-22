import { Box, Text, SimpleGrid, Icon, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "@/components/card/MiniStatistics";
import IconBox from "@/components/icons/IconBox";
import TotalData from "../../../admin-components/TotalData";
import {
  MdAddTask,
  MdBarChart,
  MdOutlineCardGiftcard,
  MdSupervisedUserCircle,
} from "react-icons/md";

import tableRecentStock from "../../../variables/tableRecentStock";
import RecentStockCountTable from "../../../admin-components/RecentStockCountTable";
import Head from "next/head";

const CountDashboard = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Lead Dashboard || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>

      <Box mt="3">
        <TotalData />
      </Box>
    </Box>
  );
};

export default CountDashboard;