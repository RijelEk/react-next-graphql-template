import React from 'react';
import { Wrapper }from "../components/Wrapper";
import {Formik, Form} from 'formik';
import {InputField} from "../components/InputField";
import {  Box, Button } from "@chakra-ui/core";

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
                    {({isSubmitting})=>(
                        <Form>
                        <InputField name="username" placeholder="username" label="Username"/>
                        <Box mt={4}>
                        <InputField name="password" placeholder="password" label="Password" type='password'/>
                        </Box>
                        <Button isLoading={isSubmitting} mt={4} type="submit" variantColor="teal" >Register</Button>
                        </Form>
                    )}
                </Formik>
        </Wrapper>
      
    );
}

export default Register;