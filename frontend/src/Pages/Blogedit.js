import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleerror} from '../Toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Blogedit = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '' });

const navigate=useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return handleerror("No token provided");
                }
                const response = await axios.get(`https://blog-website-hhnu.onrender.com/Get/post/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.post) {
                    setBlog({
                        title: response.data.post.title,
                        content: response.data.post.content,
                    });
                }
            } catch (error) {
                return handleerror(error.response.data.message);
            }
        };
        fetchBlog();
    }, [id]);



    const handleEdit = (e) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content } = blog;
        if (!title || !content) {
            return handleerror("All fields are required !!");
        }
        const token = localStorage.getItem('token');
        if (!token) {
            return handleerror('No token provided');
        }
        try {
            const response = await axios.put(`https://blog-website-hhnu.onrender.com/Blog/Update/${id}`, { title, content }, { headers: { Authorization: `Bearer ${token}` }});
            if(response)
            {
                localStorage.setItem('message',response.data.message)
                navigate('/My/Blogs')
            }
        } catch (error) {
                return handleerror(error.response?.data?.message || 'Error updating blog');
        }
    };


    return (
        <div className='main'>
            <div className="second">
                <h4 className='ti'>Write your Blog</h4>
                <form onSubmit={handleSubmit}>
                    <div className='secondform'>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            placeholder='Enter Title'
                            name='title'
                            value={blog.title}
                            onChange={handleEdit}
                        />
                    </div>
                    <div className='secondform'>
                        <label htmlFor="content">Content</label>
                        <textarea
                            name="content"
                            className='contentspace'
                            placeholder='Enter Your Blog'
                            value={blog.content}
                            onChange={handleEdit}
                        />
                    </div>
                    <div className='but'>
                        <button type='submit'>Post</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Blogedit;
