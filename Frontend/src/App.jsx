import Messenger from "./Components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./Context/AccountProvider";
function App() {
  const cliendId = import.meta.env.VITE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={cliendId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
