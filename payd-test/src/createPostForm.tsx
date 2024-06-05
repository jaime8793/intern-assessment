import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  keyframes,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

// Define keyframes for the fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

interface PostType {
  id: number;
  userId: string;
  title: string;
  body: string;
}

const CreatePostForm: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const toast = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<PostType>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId,
          title,
          body,
        }
      );

      // Add new post at the front of the list
      setPosts((prev) => [response.data, ...prev]);

      toast({
        title: "Post Created Successfully",
        description: `Your post titled "${response.data.title}" has been created`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear inputs after submission
      setUserId("");
      setTitle("");
      setBody("");
    } catch (error: any) {
      toast({
        title: "Error Creating Post",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  return (
    <Box bg="gray.100" p={5} rounded="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>User ID</FormLabel>
            <Input
              id="userId"
              placeholder="Enter user ID"
              value={userId}
              onChange={handleChange(setUserId)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={handleChange(setTitle)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Body</FormLabel>
            <Textarea
              id="body"
              placeholder="Enter post body"
              value={body}
              onChange={handleChange(setBody)}
              rows={6}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Create Post
          </Button>
        </VStack>
      </form>

      {/* Grid layout for displaying posts */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
        {posts.map((post, index) => (
          <Box
            key={post.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            rounded="md"
            transition="transform 0.2s, background-color 0.2s"
            _hover={{
              transform: "scale(1.05)",
              backgroundColor: "teal.100",
            }}
            animation={`${fadeIn} 0.5s ease-in-out`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Text mt={4}>User ID: {post.userId}</Text>
            <Text mt={4} fontWeight="bold">{post.title}</Text>
            <Text mt={4}>{post.body}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CreatePostForm;
