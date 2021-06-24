import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Page from "../../components/Page";
import { Center, VStack, HStack } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getProduct } from "../../products";

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
            <VStack>
              <Text>{product.name}</Text>
              <Text>${new Intl.NumberFormat("es").format(product.price)}</Text>
              <Button>Comprar</Button>
            </VStack>
          </HStack>
        </Center>
      </VStack>
    </Page>
  );
}
