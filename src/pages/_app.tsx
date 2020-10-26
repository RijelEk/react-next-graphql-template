import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import {LoginMutation, RegisterMutation, MeDocument, MeQuery} from "../generated/graphql";

import theme from '../theme'

function betterUpdateQuery<Result, Query>(  
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r:Result, q: Query) => Query
  ){
return cache.updateQuery(qi, data => fn(result,data as any) as any)
}

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions:{
    credentials:"include"
  },
  exchanges: [dedupExchange, cacheExchange({
    updates:{
      Mutation:{
        login: (_result: LoginMutation, args, cache, info) =>{
          cache.updateQuery({query: MeDocument}, (data:MeQuery) => {});
            betterUpdateQuery<LoginMutation, MeQuery>(
                cache, 
                {query: MeDocument},
                _result,
                (result,query) =>{
                  if(result.login.errors){
                    return query
                  } else {
                    return{
                      me: result.login.user,

                    }
                  }
                }
              )
    
        },
        register: (_result: RegisterMutation, args, cache, info) =>{
          cache.updateQuery({query: MeDocument}, (data:MeQuery) => {});
            betterUpdateQuery<RegisterMutation, MeQuery>(
                cache, 
                {query: MeDocument},
                _result,
                (result,query) =>{
                  if(result.register.errors){
                    return query
                  } else {
                    return{
                      me: result.register.user,

                    }
                  }
                }
              )
    
        }
      }
    }
  }), fetchExchange] 
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
    </Provider>
  )
}

export default MyApp
