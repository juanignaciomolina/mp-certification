import Header from "../../components/Header";
import Page from "../../components/Page";
import { VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

export default function PaymentPending() {
  return (
    <Page title="Pago aprobado" view="home">
      <VStack w="100%">
        <Header />
        <VStack p="4" borderRadius="md" borderWidth="1px" spacing="4">
          <Text fontSize="3xl" color="orange.500">
            El pago esta pendiente de aprobación
          </Text>
          <Text>Tu pago esta siendo procesado y será revisado pronto.</Text>
        </VStack>
      </VStack>
    </Page>
  );
}
