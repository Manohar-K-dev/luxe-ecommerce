import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// Context
import { ShopContext } from "../context/CreateContext.js";
// Components
import Title from "../components/Title.jsx";
import Filter from "../components/ui/Filter.jsx";
import Sort from "../components/ui/Sort.jsx";
import Product from "../components/ui/Product.jsx";

const AllProducts = () => {
  const { products, currency } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({}); // Store Active Filters
  const [sort, setSort] = useState("relevance"); // Sort

  // Search
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";
  // Main Category
  const { category } = useParams();

  // New State for PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  const paginatedProducts = filterProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  // whenever filters change → update products
  useEffect(() => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(
        (p) => p.mainCategory.toLowerCase() === category.toLowerCase()
      );
    }

    // Category Filter
    if (selectedFilters.Category?.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.Category.includes(p.category)
      );
    }

    // Sizes Filter
    if (selectedFilters["Sizes"]?.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => selectedFilters["Sizes"].includes(size))
      );
    }

    // Colors Filter
    if (selectedFilters.Colors?.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.Colors.includes(p.colors)
      );
    }

    // Price Filter
    if (selectedFilters["Price Range"]?.length > 0) {
      filtered = filtered.filter((p) => {
        const price = p.price;
        return selectedFilters["Price Range"].some((range) => {
          if (range.includes(`Under ${currency}50`)) return price < 50;
          if (range.includes(`${currency}50 to ${currency}100`))
            return price >= 50 && price < 100;
          if (range.includes(`${currency}100 to ${currency}200`))
            return price >= 100 && price < 200;
          if (range.includes(`${currency}200 to ${currency}300`))
            return price >= 200 && price < 300;
          if (range.includes(`${currency}300 & More`)) return price >= 300;
          return true;
        });
      });
    }

    // Sorting
    if (sort === "price_low_high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high_low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      filtered.sort((a, b) => b.date - a.date);
    } else if (sort === "best_sellers") {
      filtered.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.mainCategory.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm) ||
          p.subCategory.toLowerCase().includes(searchTerm)
      );
    }

    setFilterProducts(filtered);
  }, [selectedFilters, products, currency, sort, searchTerm, category]);

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-6 md:py-10 lg:py-16 xl:py-20 grid grid-cols-1 md:grid-cols-[0.4fr_1.6fr] gap-8">
      {/* LEFT FILTER (hidden on small, visible on md+) */}
      <aside className="hidden md:block">
        <Filter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col gap-8">
        {/* Header with Filter (mobile), Sort, Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Title text1={"All"} text2={"Products"} />

          {/* Filter + Sort in same line for mobile */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="md:hidden">
              <Filter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
            <Sort onSortChange={setSort} />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {paginatedProducts.map((item, index) => (
            <Product
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              mainCategory={item.mainCategory}
              bestseller={item.bestseller}
              stock={item.stock}
              description={item.description}
            />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`border px-3 py-2 rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`border px-3 py-2 rounded-lg ${
                  currentPage === num
                    ? "bg-luxe text-white"
                    : "md:hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`border px-3 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "md:hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
