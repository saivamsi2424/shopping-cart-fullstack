import Navbar from "../components/Navbar";
import Items from "./Items";

export default function Dashboard({ token, setToken }) {
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Items token={token} />
    </>
  );
}
