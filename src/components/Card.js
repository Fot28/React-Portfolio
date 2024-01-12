import { Box, VStack, Image, Heading, Text, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      bg="white" 
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" 
    >
      <Image src={imageSrc} alt={`Image for ${title}`} objectFit="cover" />
      <VStack align="start" p={5} spacing={4}>
        <Heading as="h3" size="md" color="gray.800">{title}</Heading>
        <Text color="gray.600">{description}</Text>
        <Link color="gray.800" fontWeight="semibold" fontSize="sm">
          See more <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </Link>
      </VStack>
    </Box>
  );
};

export default Card;
