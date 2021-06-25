import Header from "../../components/Header";
import Page from "../../components/Page";
import { VStack, SimpleGrid } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <Page title="Pago aprobado" view="home">
      <VStack w="100%">
        <Header />
        <VStack p="4" borderRadius="md" borderWidth="1px" spacing="4">
          <Text fontSize="3xl" color="green.500">
            Pago aprobado
          </Text>
          <Text>
            <b>Detalles del pago</b>
          </Text>
          <SimpleGrid columns={2}>
            <Text>Payment ID</Text>
            <Text>{router.query.collection_id}</Text>

            <Text>Payment Status</Text>
            <Text>{router.query.collection_status}</Text>

            <Text>External reference</Text>
            <Text>{router.query.external_reference}</Text>

            <Text>Payment Type</Text>
            <Text>{router.query.payment_type}</Text>

            <Text>Preference ID</Text>
            <Text>{router.query.preference_id}</Text>

            <Text>Site ID</Text>
            <Text>{router.query.site_id}</Text>

            <Text>Processing Mode</Text>
            <Text>{router.query.processing_mode}</Text>

            <Text>Merchant Account ID</Text>
            <Text>{router.query.merchant_account_id}</Text>
          </SimpleGrid>
        </VStack>
      </VStack>
    </Page>
  );
}
