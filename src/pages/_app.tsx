/* eslint-disable react/display-name */
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import theme from "../theme/theme";
import "../styles/globals.css";
import AdminLayout from "@/layouts/admin";
import CountLeadLayout from "@/layouts/count-lead";
import CounterLayout from "@/layouts/counter";
import ControllerLayout from "@/layouts/controller";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  let Layout;

  if (pathname.startsWith("/admin")) {
    Layout = AdminLayout;
  } else if (pathname.startsWith("/count-lead")) {
    Layout = CountLeadLayout;
  } else if (pathname.startsWith("/counter")) {
    Layout = CounterLayout;
  } else if (pathname.startsWith("/controller")) {
    Layout = ControllerLayout;
  } else {
    Layout = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

// Add display name for debugging purposes
MyApp.displayName = "Count Dashboard";

export default MyApp;