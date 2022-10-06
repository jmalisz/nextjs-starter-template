import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (properties: FlexProps) => (
  <Flex
    alignItems="center"
    bg="gray.50"
    color="black"
    direction="column"
    justifyContent="flex-start"
    transition="all 0.15s ease-out"
    _dark={{
      bg: 'gray.900',
      color: 'white',
    }}
    {...properties}
  />
)
