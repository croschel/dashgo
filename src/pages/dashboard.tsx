import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Flex>
        <h1>Hello Dashboard</h1>
      </Flex>
    </>
  );
}
