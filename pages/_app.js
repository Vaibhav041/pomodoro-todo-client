import { TodoProvider } from "@/context/TodoContext";
import { client } from "@/graphql/apollo-client";
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
        <TodoProvider>
        <Component {...pageProps} />
        </TodoProvider>
      </UserProvider>
  );
}
