import { useEffect } from "react";
import { useRouter } from "next/router";

const ControllerPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/controller/default");
  }, [router]);

  return null;
};

export default ControllerPage;