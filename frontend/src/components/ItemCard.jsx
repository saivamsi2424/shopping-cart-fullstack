import api from "../api/axios";

export default function ItemCard({ item, token }) {
  const addToCart = async () => {
    await api.post(
      "/carts",
      { itemId: item._id },
      { headers: { Authorization: token } }
    );
    alert("Item added to cart");
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-gray-600 mb-2">₹{item.price}</p>
      <button
        onClick={addToCart}
        className="bg-black text-white px-3 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
