// pages/admin/index.tsx
import {
  Box,
  Flex,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  FormControl,
  FormLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import Head from "next/head";
import SessionTable from "../../../admin-components/SessionTable";
import tableOneSession from "../../../variables/tableOneSession";
import SpotCheckTable from "@/controller-components/SpotCheckTable";
import Card from "@/components/card/Card";

const ControllerSession = () => {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const {
    isOpen: isOpenCountSession,
    onOpen: onOpenCountSession,
    onClose: onCloseCountSession,
  } = useDisclosure();

  const {
    isOpen: isOpenSpotCheck,
    onOpen: onOpenSpotCheck,
    onClose: onCloseSpotCheck,
  } = useDisclosure();

  return (
    <Box pt={{ base: "90px", md: "80px", xl: "80px" }}>
      <Head>
        <title>Count Session || Count Warehouse Manager</title>
        <meta name="description" />
      </Head>
      <Box>
        <Flex justifyContent="end">
          <Popover>
            <PopoverTrigger>
              <button className="btn btn-green">Create Session</button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
              <PopoverBody>
                <button className="btn btn-green" onClick={onOpenCountSession}>
                  Count Session
                </button>
                <button className="btn btn-alt ml-2" onClick={onOpenSpotCheck}>
                  Spot Check
                </button>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Modal isOpen={isOpenCountSession} onClose={onCloseCountSession}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Count Session</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
                <Input placeholder="Session name" mb="4" />
                <Text>Session start date:</Text>
                <Input type="date" mb="2" />
              </ModalBody>

              <ModalFooter>
                <button className="btn btn-green">Create</button>
                <button className="btn btn-ghost" onClick={onCloseCountSession}>
                  Close
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={isOpenSpotCheck} onClose={onCloseSpotCheck}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Spot Check Session</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
                <Input placeholder="Session name" mb="4" />
                <Text>Session start date:</Text>
                <Input type="date" mb="2" />
              </ModalBody>

              <ModalFooter>
                <button className="btn btn-green">Create</button>
                <button className="btn btn-ghost" onClick={onCloseSpotCheck}>
                  Close
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Card mt="3">
          <Text fontSize="xl" fontWeight="bold">
            Search session and subsession IDs
          </Text>

          <form>
            <FormControl mb="2">
              <FormLabel>Enter ID to search</FormLabel>
              <Input width={{ base: "100%", md: "50%", lg: "50%" }} />
            </FormControl>
            <button className="btn btn-green" type="submit">
              Search
            </button>
          </form>
        </Card>

        <Box mt="3">
          <SessionTable tableData={tableOneSession} />
        </Box>

        <Box mt="3">
          <SpotCheckTable tableData={tableOneSession} />
        </Box>
      </Box>
    </Box>
  );
};

export default ControllerSession;
