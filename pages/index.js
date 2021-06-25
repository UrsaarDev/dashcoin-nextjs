import { Component } from 'react';
import Head from 'next/head'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    )
  }
}

export async function getServerSideProps(context) {
  return {
    redirect: { destination: "/auth/login", permanent: false },
  };
}

export default Home;