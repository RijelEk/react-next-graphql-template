import {NavBar }from "../components/navBar";
import {withUrqlClient} from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
    <>
<NavBar/>
<div>Hello there!</div>
</>
);

export default withUrqlClient(createUrqlClient, {ssr:true})(Index);