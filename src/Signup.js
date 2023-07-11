import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const emailValidate =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const onSubmit = (values)=>{
        axios.post("http://localhost:1234/create", values).then((res)=>{
            console.log(res);
            navigate("/formik_signin")
        }).catch((err)=>{
            console.log(err);
        })
    }
    const {handleSubmit,
             handleChange,
             errors,
             touched,
             handleBlur,
             values} = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            username: 
                yup.string()
                .required("This input field cannot be empty")
                .min(5, "Cannot be less than 5 characters"),
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
            <h1>Sign up</h1>
            <form className='w-50 mx-auto my-5 p-3 rounded border shadow' onSubmit={handleSubmit} action="">
                <div className="form-group mt-3">
                    <input
                     name='username'
                     value={values.username}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     type="text"
                     autoComplete='false'
                     className={errors.username? "is-invalid form-control" : "form-control is-valid"} />
                     
                    {touched.username && errors.username && 
                        <small className='text-danger fw-bold'>{errors.username}</small>
                    }
                </div>
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
                <button type='submit'>Sign up</button>
            </form>
       </main> 
    </>
  )
}

export default Signup