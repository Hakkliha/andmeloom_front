import '../styles/globals.css'
import Layout from "../components/Functional/Layout";
import AuthProvider from "../functional/AuthContext";

function MyApp({ Component, pageProps }) {
  return <AuthProvider><Layout><Component {...pageProps} /></Layout></AuthProvider>;
}

export default MyApp
