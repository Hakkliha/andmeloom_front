import '../styles/globals.css'
import Layout from "../components/Functional/Layout";
import AuthProvider from "../functional/AuthContext";
import DataProvider from "../functional/DataContext";

function MyApp({ Component, pageProps }) {
  return <AuthProvider><DataProvider><Layout><Component {...pageProps} /></Layout></DataProvider></AuthProvider>;
}

export default MyApp
