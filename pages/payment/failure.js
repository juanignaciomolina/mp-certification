import Header from "../../components/Header";
import Page from "../../components/Page";
import { VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

export default function PaymentFailure() {
  return (
    <Page title="Pago aprobado" view="home">
      <VStack w="100%">
        <Header />
        <VStack p="4" borderRadius="md" borderWidth="1px" spacing="4">
          <Text fontSize="3xl" color="red.500">
            El pago fue rechazado
          </Text>
          <Text>MercadoPago rechazo el pago para tu compra.</Text>
        </VStack>
      </VStack>
    </Page>
  );
}
