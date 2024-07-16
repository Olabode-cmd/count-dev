// pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/default");
  }, [router]);

  return null;
};

export default AdminPage;