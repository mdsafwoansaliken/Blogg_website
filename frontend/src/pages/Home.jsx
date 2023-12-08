import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import HomePosts from '../components/HomePosts';
import Loader from '../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('latest');
  const user = useUser();

  const fetchPosts = async (sortOption) => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`, {
        params: { sortBy: sortOption },
      });
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };
  
  useEffect(() => {
    fetchPosts(selectedSortOption);
  }, [search, selectedSortOption]);
  

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        <div className="flex justify-end mb-4">
          <label htmlFor="sortOptions" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortOptions"
            onChange={handleSortChange}
            value={selectedSortOption}
            className="border p-2 rounded"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
            {/* Add more options if needed */}
          </select>
        </div>
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : '/login'}>
              <HomePosts key={post._id} post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-1">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;