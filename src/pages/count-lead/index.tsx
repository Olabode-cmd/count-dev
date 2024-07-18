// pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const CountLeadPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/count-lead/default");
  }, [router]);

  return null;
};

export default CountLeadPage;