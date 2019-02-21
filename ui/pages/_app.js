import React from "react"
import App, { Container } from "next/app"
import { ApolloProvider } from "react-apollo"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"
import withApolloClient from "../lib/with-apollo-client"
import UserProvider from "../lib/user-context";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <UserProvider client={apolloClient}>
              <Component {...pageProps} />
            </UserProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
