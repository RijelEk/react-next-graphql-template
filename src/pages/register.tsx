import React from 'react';
import { Wrapper }from "../components/Wrapper";
import {Formik, Form} from 'formik';
import {InputField} from "../components/InputField";
import {  Box, Button } from "@chakra-ui/core";
import { useMutation } from 'urql';

interface registerProps{

}

const REGISTER__MUT = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors{
        field
        message
        
      }
      user {
        id
        createdAt
        username
      }
    }
  }
`

const Register: React.FC<registerProps> = ({}) =>{
    const [,register] = useMutation(REGISTER__MUT);
    return(
        <Wrapper variant="small">
        <Formik 
                initialValues={{username:"", password:""}}
                onSubmit={async (values) =>{
                   const response = await register(values)
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