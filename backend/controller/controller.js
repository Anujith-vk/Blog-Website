const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const { Users, posts } = require('../Schema/schema')


const Register=async function (req,res) {
    const{name,phone,email,password}=req.body
    if(!name||!phone||!email||!password)
    {
        return res.status(400).json({message:"Please Fill All The Feilds"})
    }
    try {
        const isregistered=await Users.findOne({email})
        if(isregistered)
        {
            return res.status(400).json({message:"User Already Exists"})
        }
        const hashedpassword= await bcrypt.hash(password,10)
        const newuser=await Users.create({
            name,phone,email,password:hashedpassword
        })
        return res.status(200).json({message:"User Registered Successfully",user:newuser})
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
}

const Login=async function (req,res) {
    const{email,password}=req.body
    if(!email||!password)
    {
        return res.status(400).json({message:"Please Enter All The Feilds"})
    }
        try {
           const isregistered=await Users.findOne({email})
           if(!isregistered)
            {
                return res.status(400).json({message:"User Not Registered ! Please Register"})
            } 
            const ispasswordvalid=await bcrypt.compare( password, isregistered.password)
            if(!ispasswordvalid)
            {
                return res.status(400).json({message:"Password Incorrect"})
            }
            const token=jwt.sign({_id:isregistered._id},process.env.jwt_key)
            return res.status(200).json({message:"Login Successfull",user:isregistered,token})
        } catch (error) {
            return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
        }
}

const CreatePost=async function (req,res) {
    const{ author,title,content,createdAt,updatedAt}=req.body
    const id=req.user._id
    if(!author||!title||!content)
    {
        return res.status(400).json({message:"Please Fill All The Details"})
    }
    try {
        const blog=await posts.create({
            author,title,content,createdAt:Date.now(),updatedAt:Date.now(),userid:id
        })
        return res.status(200).json({message:"Blog Posted Successfully",blog})
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
}

const UpdatePost=async function (req,res) {
    const{id}=req.params
    const{title,content,updatedAt}=req.body
    if(!title||!content)
    {
        return res.status(400).json({message:"Please Fill All The Details"})
    }
    try {
        const blog=await posts.findByIdAndUpdate(id,{title,content,updatedAt:Date.now()},{new:true})
        return res.status(200).json({message:"Blog Updated Successfully",blog})
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
}

const DeletePost=async function (req,res) {
    const {id}=req.params
    try {
        const deleting=await posts.findByIdAndDelete(id)
        if(deleting)
        {
            return res.status(200).json({message:"Blog Deleted Successfully"})
        }
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
}

const ShowAllBlog=async function (req,res) {
    try {
        const blogs=await posts.find({})
        return res.status(200).json({blogs:blogs})
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
}

const DisplayBlogs = async function (req, res) {
    const userId = req.user._id; 
    try {
        const results = await posts.find({ userid: userId }); 
        if (results.length === 0) {
            return res.status(404).json({ message: "No Blogs Found" });
        }
        return res.status(200).json({ message: "Blogs retrieved successfully", results });
    } catch (error) {
        return res.status(500).json({ message: "Unexpected Error Occurred", error: error.message });
    }
};

const getUserPostById = async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await posts.findOne({ _id: id }); 
        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }
        return res.status(200).json({ message: "Post retrieved successfully", post });
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
};

module.exports={
    Register,
    Login,
    CreatePost,
    UpdatePost,
    DeletePost,
    ShowAllBlog,
    DisplayBlogs,
    getUserPostById

}