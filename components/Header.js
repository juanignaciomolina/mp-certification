import Image from "next/image";
import { VStack, HStack } from "@chakra-ui/layout";
import { Heading, Divider } from "@chakra-ui/react";

export default function Header() {
  return (
    <VStack w="100%" pt="4">
      <HStack w="100%" maxW="1200px" px="4" spacing="4">
        <Image src="/pineapple.svg" height="32px" width="32px" alt="Logo" />
        <Heading>Piña Store</Heading>
      </HStack>
      <Divider />
    </VStack>
  );
}
