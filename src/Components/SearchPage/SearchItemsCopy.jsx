import React, { useState } from "react";
import { data } from "./AllProductsData";

function SearchItems() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const { name, seller } = item;
    const lowercaseQuery = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(lowercaseQuery) ||
      seller.name.toLowerCase().includes(lowercaseQuery)
      // description.toLowerCase().includes(lowercaseQuery)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div>
        {filteredData.map((item) => (
          <div key={item._id}>
            <img
              style={{ height: "100px" }}
              src={item.displayImage}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.seller.name}</p>
            {/* <p>{item.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchItems;
