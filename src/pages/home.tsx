import { useLoginContent } from "../contexts/login-context";
import Dashboard from "./dashboard";
import LoginPage from "./login";

function Home() {
  const { isLoggedIn } = useLoginContent();

  return <div>{isLoggedIn ? <Dashboard /> : <LoginPage />}</div>;
}

export default Home;
