import {
  Box,
  useColorModeValue,
  SimpleGrid,
  Text,
  Input,
  Select,
  Flex,
  Button,
} from "@chakra-ui/react";
import Card from "@/components/card/Card";
import ReportTable from "../../../admin-components/ReportTable";
import tableReport from "../../../variables/tableReport";
import Head from "next/head";

export default function ControllerReport() {
  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Report || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Card>
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Report Generation Form
          </Text>

          <Text>Enter Session ID</Text>
          <Input />

          <Text mt='3'>Choose Subsession (optional)</Text>
          <Select mb="3">
            <option value="option1">M1 Subsession</option>
            <option value="option2">M2 subsession</option>
            <option value="option3">A1 subsession</option>
          </Select>

          <Text>Report type</Text>
          <Select mb="3">
            <option value="option1">Inventory Accuracy</option>
            <option value="option2">Variance Analysis</option>
            <option value="option3">Aging Analysis</option>
          </Select>

          <Flex justifyContent="end">
            <button className="btn btn-green">Generate</button>
          </Flex>
        </Card>

        <Card>
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Recent Reports
          </Text>

          <Box>
            <Flex justifyContent="space-between" alignItems="center" p="4">
              <Text>Report (Apr 16-May16)</Text>

              <Flex>
                <button className="btn btn-green">View PDF</button>
                <button className="btn btn-green ml-2">View Excel</button>
              </Flex>
            </Flex>
            <hr />
            <Flex justifyContent="space-between" alignItems="center" p="4">
              <Text>Report (Apr 16-May16)</Text>

              <Flex>
                <button className="btn btn-green">View PDF</button>
                <button className="btn btn-green ml-2">View Excel</button>
              </Flex>
            </Flex>
            <hr />
            <Flex justifyContent="space-between" alignItems="center" p="4">
              <Text>Report (Apr 16-May16)</Text>

              <Flex>
                <button className="btn btn-green">View PDF</button>
                <button className="btn btn-green ml-2">View Excel</button>
              </Flex>
            </Flex>

            <Flex justifyContent="end" mt="2">
              <button className="btn btn-text">View more</button>
            </Flex>
          </Box>
        </Card>
      </SimpleGrid>
      <Box mt="3">
        <ReportTable tableData={tableReport} />
      </Box>
    </Box>
  );
}