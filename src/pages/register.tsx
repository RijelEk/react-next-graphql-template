import React from 'react';
import { Wrapper }from "../components/Wrapper";
import {Formik, Form} from 'formik';
import {InputField} from "../components/InputField";
import {  Box } from "@chakra-ui/core";

interface registerProps{

}

const Register: React.FC<registerProps> = ({}) =>{
    return(
        <Wrapper variant="small">
        <Formik 
                initialValues={{username:"", password:""}}
                onSubmit={(values) =>{
                    console.log(values)
                }}
                >
                    {(values, handleChange)=>(
                        <Form>
                        <InputField name="username" placeholder="username" label="Username"/>
                        <Box mt={4}>
                        <InputField name="password" placeholder="password" label="Password" type='password'/>
                        </Box>
                        </Form>
                    )}
                </Formik>
        </Wrapper>
      
    );
}

export default Register;