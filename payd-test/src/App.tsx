import "./App.css";
//import { ChakraProvider } from '@chakra-ui/react';
import Navbar from "./navbar";
//import Posts from './posts';
//import CreatePost from './postLists';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsList from "./postsList";
import CreatePostForm from "./createPostForm";
import AboutMe from "./aboutMe";

function App(): JSX.Element {
  return (
    //<ChakraProvider>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/createPosts" element={<CreatePostForm />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </BrowserRouter>
    </div>
    //</ChakraProvider>
  );
}

export default App;
