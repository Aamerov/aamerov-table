import "@/styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import store from "../store/store";

export default function App({ Component, pageProps }) {
  const client = new Client({
    url: "https://graphqlzero.almansi.me/api",
    exchanges: [cacheExchange, fetchExchange],
  });
  return (
    <ReduxProvider store={store}>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </ReduxProvider>
  );
}
