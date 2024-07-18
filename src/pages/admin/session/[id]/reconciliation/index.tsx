import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import Card from "@/components/card/Card";
import Head from "next/head";
import { useRouter } from "next/router";
import ReconTable from "@/pages/admin/components/ReconTable";
import tableRecon from "@/pages/admin/variables/tableRecon";

export default function Reconciliation() {
    const router = useRouter();
    const { id } = router.query;
    
    return (
      <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
        <Head>
          <title>Reconciliation || Count Warehouse Manager</title>
          <meta name="description" />
        </Head>

        <ReconTable tableData={tableRecon} />
      </Box>
    );
}