import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  useToast,
  Text,
  Spinner,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import Post from "./Post"; // Import the Post component

// Define interface for the structure of a post
interface PostType {
  id: number;
  title: string;
  body: string;
}

const PostsList: React.FC = () => {
  const toast = useToast();
  const [posts, setPosts] = useState<PostType[]>([]); // State for storing posts
  const [loading, setLoading] = useState<boolean>(false); // State for loading status
  const [page, setPage] = useState<number>(1); // State for pagination

  // Function to fetch posts from the API
  const fetchPosts = async (page: number) => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get<PostType[]>( // Fetch posts from the API
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page,
            _limit: 10,
          },
        }
      );
      setPosts(response.data); // Update the posts state with fetched data
    } catch (error: any) {
      // Handle errors
      toast({
        title: "Error Fetching Posts",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Set loading back to false after fetching
    }
  };

  useEffect(() => {
    fetchPosts(page); // Fetch posts when the page state changes
  }, [page]);

  return (
    <Container maxW="container.lg" p={4}>
      <Box mt={10}>
        <Text fontSize="2xl" mb={4}>
          Posts
        </Text>
        {loading ? ( // Show a spinner while loading
          <Spinner />
        ) : (
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {/* Map through posts and render Post component */}
            {posts.map((post, index) => (
              <Post key={post.id} post={post} index={index} />
            ))}
          </SimpleGrid>
        )}
        {/* Pagination controls */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Previous page button
            isDisabled={page === 1} // Disable if on first page
          >
            Previous
          </Button>
          <Text>Page {page}</Text>
          <Button onClick={() => setPage((prev) => prev + 1)}
          >Next</Button>{" "}
          {/* Next page button */}
        </Box>
      </Box>
    </Container>
  );
};

export default PostsList;
