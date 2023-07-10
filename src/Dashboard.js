import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

const Dashboard = () => {
  const onSubmit = (values) => {
    axios.post("http://localhost:1234/view-post", values).then((res) => {
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }


  const navigate = useNavigate()
  const [currUser, setCurrUser] = useState("");
  const [allPosts, setallPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:1234/signin")
      .then((res) => {
        // console.log(res.data);
        if (!res.data.username) {
          alert("No user");
          navigate("/login");
        } else {
          setCurrUser(res.data.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
    enableReinitialize: true, // Add this option
    initialValues: {
      content: "",
      username: currUser,
    },
    onSubmit,
  });

  // console.log(values);

  return (
    <>
      <h1>Welcome to your Dashboard {currUser}</h1>
      <form action='submit' onSubmit={handleSubmit} className='align-items-center'>
        <input type="text" name='content' onChange={handleChange} className='border border-black rounded mx-2' />
        <button className='btn btn-success'>Post</button>
      </form>
      <div>
        {
          useEffect(() => {
            axios.get("http://localhost:1234/view-post")
              .then((res) => {
                setallPosts(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }, [])}

        {
          useEffect(() => {
            console.log(allPosts);
          }, [allPosts])
        }


        {
          allPosts.map((post) => (
            <div className='d-flex justify-content-center text-center' key={post.id}>
              <div className='w-75 shadow-lg rounded-3 py-2 my-2'>
                <h6>{post.username}</h6>
                <p className='fs-5'>{post.content}</p>
                <div className='d-flex justify-content-around'>
                <button className='btn btn-success'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
                </div>
              </div>
            </div>
          ))
        }

      </div>

    </>
  )
}

export default Dashboard