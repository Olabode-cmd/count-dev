import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";

const DataEntry = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Text>Data Entry for Session {id}</Text>
      {/* Data entry form or components go here */}
    </Box>
  );
};

export default DataEntry;