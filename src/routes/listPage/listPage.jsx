import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { listData } from "../../lib/dummydata"; // Import dummy data

function ListPage() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const data = useLoaderData();

  // Search filter function
  const filterPosts = (query, posts) => {
    if (!query) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.address.toLowerCase().includes(query.toLowerCase()) ||
        post.price.toString().includes(query) // Optionally search by price
    );
  };

  // Get filtered posts based on the search query
  const filteredPosts = filterPosts(
    searchQuery,
    data?.postResponse?.data || listData
  );

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter setSearchQuery={setSearchQuery} />{" "}
          {/* Pass the setter function for search */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data?.postResponse} // Make sure data is not undefined
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                filteredPosts?.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                ) : (
                  <p>No posts found</p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading map...</p>}>
          <Await
            resolve={data?.postResponse} // Make sure data is not undefined
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={filteredPosts || []} />}{" "}
            {/* Pass filtered posts to Map */}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
