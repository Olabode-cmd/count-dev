import { useRouter } from "next/router";

const DescriptionPage = () => {
  const router = useRouter();
  const { description } = router.query;

  return (
    <div>
      <h1>{description}</h1>
      <p>This is the dynamic page for {description}.</p>
    </div>
  );
};

export default DescriptionPage;