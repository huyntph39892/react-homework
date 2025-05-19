import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page, limit, sort, search]);

  const fetchProducts = async () => {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();
    let result = data.products;

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setProducts(result);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          className="border px-3 py-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setLimit(Number(e.target.value))}
          value={limit}
        >
          <option value={6}>6 / trang</option>
          <option value={12}>12 / trang</option>
          <option value={24}>24 / trang</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">-- Sắp xếp theo giá --</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-3 rounded shadow">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded"
        >
          &laquo;
        </button>
        <span>Trang {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
