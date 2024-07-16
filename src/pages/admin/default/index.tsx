import { Box, SimpleGrid, Icon, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "@/components/card/MiniStatistics";
import IconBox from "@/components/icons/IconBox";
import { MdAddTask, MdBarChart, MdOutlineCardGiftcard, MdSupervisedUserCircle } from "react-icons/md";
import TotalData from "../components/TotalData";
import tableRecentStock from "../variables/tableRecentStock";
import RecentStockCountTable from "../components/RecentStockCountTable";
import Head from "next/head";

const MainDashboard = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "90px", md: "90px", xl: "90px" }}>
      <Head>
        <title>Dashboard || Count Warehouse Manager</title>
        <meta
          name="description"
          content="This is the home page of my Next.js app"
        />
      </Head>
      
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdBarChart} color="#015e63" />}
            />
          }
          name="Total Warehouses"
          value="5"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdSupervisedUserCircle}
                  color="#015e63"
                />
              }
            />
          }
          name="Count Leads"
          value="13"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdOutlineCardGiftcard}
                  color="#015e63"
                />
              }
            />
          }
          name="Total Items"
          value="2935"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #015e63 0%, #015e63 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="Active count sessions"
          value="14"
        />
      </SimpleGrid>

      <Box>
        <TotalData />
      </Box>
      <Box mt="4">
        <RecentStockCountTable tableData={tableRecentStock} />
      </Box>
    </Box>
  );
};

export default MainDashboard;