import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const emailValidate =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const [allUser, setallUser] = useState(null)
    const [err, seterr] = useState("")
    useEffect(() => {
        axios.get("http://localhost:1234/create").then((res)=>{
            setallUser(res.data)
            console.log(allUser);
        }).catch((err)=>{
            console.log(err);
            
        })
    }, [])
    
    const onSubmit = (values)=>{
        let found = allUser.find((el)=> el.email == values.email && el.password == values.password)
        if(found){
            axios.post("http://localhost:1234/signin", found).then((res)=>{
                console.log(res);
                navigate("/dashboard")
            }).catch((err)=>{
                console.log(err);
                if(err.response.data.includes("duplicate")){
                    seterr("User already signed in")
                    navigate("/dashboard")
                }
            })
        }else{
            alert("User not registered")
            return
        }
    }
    const {handleSubmit,
             handleChange,
             errors,
             touched,
             handleBlur,
             values} = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .matches(emailValidate, "Must be a valid email")
                .required("Email field is required"),
            password: yup.string()
                .required("Password field cannot be empty")
                .min(6, "Password cannot be less than 6 characters")
        }),
        onSubmit
    })
  return (
    <>
       <main>
            <h1>Login</h1>
            {err ? <p>{err}</p>: null}
            <form className='w-50 mx-auto my-5 p-3 rounded border shadow' onSubmit={handleSubmit} action="">
                
                <div className="form-group mt-3">
                    <input
                     onBlur={handleBlur}
                     
                     name='email' value={values.email} onChange={handleChange} type="email" className="form-control" />
                    {touched.email && errors.email && 
                        <small className='text-danger fw-bold'>{errors.email}</small>
                    }
                </div>
                <div className="form-group mt-3">
                    <input
                     onBlur={handleBlur}
                     name='password' value={values.password} onChange={handleChange} type="password" className="form-control" />
                    {touched.password && errors.password && 
                        <small className='text-danger fw-bold'>{errors.password}</small>
                    }
                </div>
                <button type='submit'>Login</button>
            </form>
       </main> 
    </>
  )
}

export default Signin