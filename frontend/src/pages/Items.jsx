import { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

export default function Items({ token }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} token={token} />
      ))}
    </div>
  );
}
