import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Page from "../../components/Page";
import { Center, VStack, HStack } from "@chakra-ui/layout";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getProduct } from "../../products";
import { MERCADOPAGO_PUBLIC_KEY, PUBLIC_URL } from "../../configuration";
import Script from "next/script";

export default function Product() {
  const router = useRouter();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (router.query.id)
      getProduct(router.query.id).then((result) => setProduct(result));
  }, [router.query.id]);

  if (!product) return null;

  return (
    <Page title={product?.name || "Producto"} view="item">
      <VStack w="100%">
        <Header />
        <Center w="100%" h="100%">
          <HStack p="4" borderRadius="md" borderWidth="1px" spacing="8">
            <Image
              src={product.pictureUrl}
              alt={product.name}
              height="300px"
              width="300px"
              objectFit="contain"
            />
            <VStack justify="space-between">
              <Text fontSize="3xl" maxW="500px" textAlign="center">
                <b>{product.name}</b>
              </Text>
              <Text fontSize="lg">
                ${new Intl.NumberFormat("es").format(product.price)}
              </Text>
              <BuyButton />
            </VStack>
          </HStack>
        </Center>
      </VStack>
    </Page>
  );
}

const BuyButton = () => {
  const toast = useToast();
  const [doingCheckout, setDoingCheckout] = useState(false);
  const [mercadoPagoClient, setMercadoPagoClient] = useState(false);
  const [loadingMercadoPagoClient, setLoadingMercadoPagoClient] =
    useState(true);

  const getPreferenceId = async () =>
    fetch(`${PUBLIC_URL}/api/preference`)
      .then((response) => response.json())
      .then((data) => Promise.resolve(data.preferenceId));

  const checkoutWithMercadoPago = (preferenceId) => {
    console.log(preferenceId);
    console.log(mercadoPagoClient);

    mercadoPagoClient.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true, // Open MercadoPago checkout immediately
    });
  };

  const doCheckout = () => {
    setDoingCheckout(true);

    getPreferenceId()
      .then((preferenceId) => checkoutWithMercadoPago(preferenceId))
      .catch((error) => {
        console.log(error);
        showErrorToast();
      })
      .finally(setDoingCheckout(false));
  };

  function showErrorToast() {
    toast({
      title: "Ocurrió un error",
      description: "No fue posible realizar el checkout con MercadoPago",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <>
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="afterInteractive"
        onLoad={() => {
          setMercadoPagoClient(
            new window.MercadoPago(MERCADOPAGO_PUBLIC_KEY, {
              locale: "es-AR",
            })
          );
          setLoadingMercadoPagoClient(false);
        }}
      ></Script>
      <Button
        isLoading={doingCheckout || loadingMercadoPagoClient}
        onClick={() => doCheckout()}
      >
        Comprar con MercadoPago
      </Button>
    </>
  );
};
