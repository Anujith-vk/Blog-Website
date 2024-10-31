import React, { useState, useEffect } from 'react';
import '../Pages/Myblogs.css';
import axios from 'axios';
import { handleerror, handlesuccess } from '../Toast';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const Myblogs = () => {
  const [blogs, setblogs] = useState([]);
  const [error, setError] = useState(null);

  const HandleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return handleerror("No token provided");
      }
      const response = await axios.delete(`https://blog-website-hhnu.onrender.com/Blog/Delete/${id}`, {headers: { Authorization: `Bearer ${token}` }
      });
      if (response) {
        handlesuccess(response.data.message);
        fetchBlogs();
      }
    } catch (error) {
      if (error.response) {
        handleerror(error.response.data.message);
      } else {
        handleerror("An unexpected error occurred");
      }
    }
  };

  const fetchBlogs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return handleerror("No token provided");
    }
    try {
      const response = await axios.get('https://blog-website-hhnu.onrender.com/Blogs/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setblogs(response.data.results);
      setError(null);
    } catch (error) {
      setError("Failed to fetch blogs. Please try again.");
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const message=localStorage.getItem('message')
    if(message)
    {
        handlesuccess(message)
        setTimeout(() => {
            localStorage.removeItem('message')
        }, 2000);
    }
  }, [])

  return (
    <div className='one'>
        <div className="two">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div className="mycont" key={blog._id}>
                        <div className="mytitle">
                            {blog.title}
                        </div>
                        <div className="details">
                            <div className="author">
                                Author: {blog.author}
                            </div>
                            <div className="datetime">
                                <li>Created On: {blog.createdAt}</li>
                                <li>Updated On: {blog.updatedAt}</li>
                            </div>
                        </div>
                        <div className="bcontent">
                            {blog.content}
                        </div>
                        <div className='buttons'>
                            <div>
                                <Link to={`Edit/${blog._id}`} className="editb">Edit</Link>
                            </div>
                            <div>
                                <button className="deleteb" onClick={() => { HandleDelete(blog._id) }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : !error ? (
                <div className="no-blogs-message">No blogs available.</div>
            ) : null}
        </div>
        <ToastContainer />
    </div>
);

  
}

export default Myblogs;
