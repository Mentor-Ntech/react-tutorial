import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import Postpage from "./PostPage";
import { useState, useEffect } from "react";
// step1
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My first Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, ad omnis iusto exercitationem nisi laudantium soluta nihil quia optio commodi neque dolores voluptas officia dolore aspernatur libero, quaerat recusandae inventore!",
    },
    {
      id: 2,
      title: "My Second Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, ad omnis iusto exercitationem nisi laudantium soluta nihil quia optio commodi neque dolores voluptas officia dolore aspernatur libero, quaerat recusandae inventore!",
    },
    {
      id: 3,
      title: "My third Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, ad omnis iusto exercitationem nisi laudantium soluta nihil quia optio commodi neque dolores voluptas officia dolore aspernatur libero, quaerat recusandae inventore!",
    },
    {
      id: 4,
      title: "My fourth Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, ad omnis iusto exercitationem nisi laudantium soluta nihil quia optio commodi neque dolores voluptas officia dolore aspernatur libero, quaerat recusandae inventore!",
    },
    {
      id: 5,
      title: "My fifth Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, ad omnis iusto exercitationem nisi laudantium soluta nihil quia optio commodi neque dolores voluptas officia dolore aspernatur libero, quaerat recusandae inventore!",
    },
  ]);
  
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Step 1
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  //STEP 3
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    // history.push('/');
    navigate('/')
  }


  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList)
     navigate('/')
  };

  return (
    <div className="App">
      <Header title="DLT Blogs" />
      <Nav search={search} setsearch={setSearch} />
      <Routes>
        {/* <Route path="/" element={<Home posts={posts} />} /> */}

        {/* Step 3 */}
        <Route path="/" element={<Home posts={searchResults} />} />

        {/* Step 1*/}
        <Route path="/post" element={<NewPost 
         handleSubmit={handleSubmit}
         postTitle={postTitle}
         setPostTitle={setPostTitle}
         postBody={postBody}
         setPostBody={setPostBody}/>} />

        <Route
          path="/post/:id"
          element={<Postpage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;