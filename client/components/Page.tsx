import React, { Component } from "react";
import Head from "next/head";
import Header from "./header/Header";

class Page extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Posts</title>
        </Head>
        <Header />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Page;
