import Image from "next/image";
import { VStack, SimpleGrid } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { listProducts } from "../products";
import Header from "../components/Header";
import Page from "../components/Page";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    listProducts().then((result) => setProducts(result));
  }, []);

  return (
    <Page>
      <VStack h="100%" w="100%" spacing="12">
        <Header />
        {products && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8" p="4">
            {products.map((product, index) => (
              <Product
                key={`product_${index}`}
                id={product.id}
                name={product.name}
                price={product.price}
                pictureUrl={product.pictureUrl}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Page>
  );
}

const Product = ({ id, name, price, pictureUrl }) => {
  return (
    <Link href={`/product/${encodeURIComponent(id)}`}>
      <a>
        <VStack
          w="100%"
          cursor="pointer"
          _hover={{ backgroundColor: "gray.100" }}
          borderRadius="md"
          p="1"
        >
          <Image
            src={pictureUrl}
            alt={name}
            height="300px"
            width="300px"
            objectFit="contain"
          />
          <Text fontSize="lg">
            <b>{name}</b>
          </Text>
          <Text>${new Intl.NumberFormat("es").format(price)}</Text>
        </VStack>
      </a>
    </Link>
  );
};
