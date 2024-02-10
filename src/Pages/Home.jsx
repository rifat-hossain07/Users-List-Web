import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../Components/UserCard";
import Loading from "../Components/Loading";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://dummyjson.com/users`).then((res) => {
      setUsers(res.data.users);
      setLoading(false);
    });
  }, []);
  //   useEffect(() => {
  //     function handleScroll() {
  //       // Height of the area already scrolled
  //       const scrollTop = document.documentElement.scrollTop;
  //       // Height of the entire webpage
  //       const scrollHeight = document.documentElement.scrollHeight;
  //       // Height of the current windows
  //       const clientHeight = document.documentElement.clientHeight;
  //       // check if the user scrolled the page and reach the bottom
  //       if (scrollTop + clientHeight >= scrollHeight - 1) {
  //         setPageNumber(pageNumber + 1);
  //       }
  //     }
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [pageNumber]);
  const handleSearch = (e) => {
    fetch(`https://dummyjson.com/users/search?q=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  };
  // Function to handle sorting
  const handleSort = (e) => {
    const sortOption = e.target.value;
    sortedUsers(sortOption);
  };
  const sortedUsers = (sortOption) => {
    if (!sortOption) {
      window.location.reload();
      return;
    }
    let sorted = [...users];
    if (sortOption === "name") {
      sorted.sort((a, b) => {
        if (a.firstName && b.firstName) {
          return a.firstName.localeCompare(b.firstName);
        } else if (a.firstName) {
          return -1;
        } else if (b.firstName) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortOption === "email") {
      sorted.sort((a, b) =>
        a.email && b.email ? a.email.localeCompare(b.email) : 0
      );
    } else if (sortOption === "company") {
      sorted.sort((a, b) =>
        a.company && b.company
          ? a.company.name.localeCompare(b.company.name)
          : 0
      );
    }
    setUsers(sorted);
  };
  return (
    <>
      {/* Search and Sorting Options */}
      <div className="flex flex-col md:flex-row justify-center mb-5 gap-5 md:gap-0">
        <div className="w-2/3 md:w-1/2 mx-auto">
          <input
            className="input input-bordered input-accent input-lg text-accent w-full"
            type="text"
            placeholder="Search by name..."
            onChange={handleSearch}
          />
        </div>
        <div className="mx-auto">
          <select
            className="input input-bordered input-accent input-lg text-accent"
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company Name</option>
          </select>
        </div>
      </div>
      {/* Add User Button */}
      <div className="flex justify-center mb-5">
        <button className="btn btn-outline btn-accent btn-wide">
          Add New User
        </button>
      </div>
      {/* Card View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
        {users?.map((user, idx) => (
          <UserCard key={idx} user={user} />
        ))}
      </div>
      {loading && <Loading />}
    </>
  );
};
export default Home;
