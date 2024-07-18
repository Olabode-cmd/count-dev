import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { RoutesType } from "../../../types/hui-types";

export function SidebarLinks({ routes }: { routes: RoutesType[] }) {
  const router = useRouter();
  const { pathname } = router;

  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  const activeIcon = "#015e63";
  const textColor = useColorModeValue("secondaryGray.500", "white");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/count-lead"
      ) {
        return (
          <Link key={index} href={route.layout + route.path} passHref>
            <Box>
              <HStack
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
                py="5px"
                ps="10px"
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me="18px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? "#015e63"
                      : "transparent"
                  }
                  borderRadius="5px"
                />
              </HStack>
            </Box>
          </Link>
        );
      }
      return null;
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;