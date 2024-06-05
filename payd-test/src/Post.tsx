import React from "react";
import { Box, Text, keyframes } from "@chakra-ui/react";

// Define keyframes for the fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Define props interface for the Post component
interface PostProps {
  post: {
    title: string;
    body: string;
  };
  index: number;
}

// Post component
const Post: React.FC<PostProps> = ({ post, index }) => {
  return (
    <Box
      // Styling for the post container
      p={5}
      shadow="md"
      borderWidth="1px"
      rounded="md"
      transition="transform 0.2s, background-color 0.2s"
      _hover={{
        transform: "scale(1.05)",
        backgroundColor: "teal.100",
      }}
      // Apply fade-in animation
      animation={`${fadeIn} 0.5s ease-in-out`}
      style={{ animationDelay: `${index * 0.1}s` }} // Delay animation based on index
    >
      {/* Post title */}
      <Text fontWeight="bold">{post.title}</Text>
      {/* Post body */}
      <Text mt={4}>{post.body}</Text>
    </Box>
  );
};

export default Post;
