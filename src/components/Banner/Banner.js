import { React, useState, useRef, useEffect } from "react";
import "../Banner/Banner.css"

function Banner({ onSearch, postsList }) {
  console.log(postsList)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const searchBoxRef = useRef(null);
  const handleSearch = (event) => {
    const query = event.target.value;
    console.log(query)
    setSearchTerm(query);

    if (query.trim() === "") {
      setFilteredPosts([]);
      return;
    }

    const results = postsList.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0,5);
    setFilteredPosts(results);
    console.log(results)
  };
  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setFilteredPosts([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="main-banner" >
      <h1>Let's Blog</h1>
      <div className="inner-main">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch} 
        />
        <button onClick={() => onSearch(searchTerm)}  >Search</button>
      </div>

      <div className="list" ref={searchBoxRef}>
        {filteredPosts.length > 0 ? (
          <ul >
            {filteredPosts.map((post) => (

              <li
                key={post.id}

                onClick={() => {setSearchTerm(post.title);
                  setFilteredPosts([]);}}
              >
                {post.title}
              </li>
            ))}
          </ul>
        ) : ''}
      </div>

      <div className="banner">
        <h2>Explore intresting blogs</h2>


        <p>Unleash your creativity with AI! Start your blogging journey effortlessly—just click the 'Create Blog' button, and let AI assist you in crafting engaging, high-quality content.</p>


      </div>

    </div>
  )
}
export default Banner;




