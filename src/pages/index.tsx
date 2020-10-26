import {NavBar }from "../components/navBar";
import {withUrqlClient} from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
    const [{data}] = usePostsQuery();
    return (
    <>
<NavBar/>
<div>Hello there!</div>
{!data ? null: data.posts.map((el)=>(
    <div key={el.id}>{el.title}</div>
))}
</>
)};

export default withUrqlClient(createUrqlClient, {ssr:true})(Index);