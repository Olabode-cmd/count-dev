// pages/_app.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import AdminLayout from "@/layouts/admin";
// import CountLeadLayout from "@/components/layouts/CountLeadLayout";
import theme from "../../src/theme/theme";
import { ReactNode } from "react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  let Layout;

  if (pathname.startsWith("/admin")) {
    Layout = AdminLayout;
  } else {
    Layout = ({ children }: { children: ReactNode }) => <>{children}</>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;