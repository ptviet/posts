import React, { Component } from "react";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import Header from "./header/Header";

class Page extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Posts</title>
        </Head>
        <Header />
        <div style={{ paddingTop: 60 }}>{this.props.children}</div>
        <footer
          id="footer"
          style={{
            left: 0,
            bottom: 0,
            height: 50,
            width: "100%"
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              height: 50,
              textAlign: "center",
              borderTop: "1px solid #e0e0e0",
              paddingTop: 30,
              paddingBottom: 5
            }}
          >
            <Typography variant="caption" gutterBottom>
              Made with ♥ by STEVEN
            </Typography>
          </div>
        </footer>
      </div>
    );
  }
}

export default Page;
