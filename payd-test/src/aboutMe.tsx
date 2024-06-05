import React from "react";
import { Box, Text } from "@chakra-ui/react";

// AboutMe component
const AboutMe: React.FC = () => {
  return (
    <Box
      // Styling for the container
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      bgGradient="linear(to-br, teal.400, teal.600)"
      color="white"
      textAlign="center"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      {/* Title */}
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        About Me
      </Text>
      {/* Description */}
      <Text fontSize="md">
        I'm not just a developer; I'm a code-slinging sorcerer, weaving digital
        spells with the flick of my keyboard. When I'm not conquering bugs or
        conjuring up innovative solutions, you'll find me exploring new realms
        of technology or perfecting my latest meme.
      </Text>
    </Box>
  );
};

export default AboutMe;
