import api from "../api/axios";

export default function Navbar({ token, setToken }) {
  const headers = { Authorization: token };

  const viewCart = async () => {
    const res = await api.get("/carts", { headers });
    alert(JSON.stringify(res.data));
  };

  const viewOrders = async () => {
    const res = await api.get("/orders", { headers });
    alert(JSON.stringify(res.data));
  };

  const checkout = async () => {
    await api.post("/orders", {}, { headers });
    alert("Order placed successfully");
  };

  const logout = async () => {
    await api.post("/users/logout", {}, { headers });
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex gap-4">
      <button onClick={checkout}>Checkout</button>
      <button onClick={viewCart}>Cart</button>
      <button onClick={viewOrders}>Orders</button>
      <button onClick={logout} className="ml-auto">
        Logout
      </button>
    </div>
  );
}
