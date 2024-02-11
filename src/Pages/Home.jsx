import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../Components/UserCard";
import Loading from "../Components/Loading";
import Modal from "react-modal";
import Button from "../Components/Button";
import { toast } from "react-toastify";
import Table from "../Components/Table";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  //   const [pageNumber, setPageNumber] = useState(1);
  const customStyles = {
    content: {
      background: "#4FD1C5",
      content: "center",
      height: "90%",
      width: "90%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function handleTableView() {
    setShowTable(!showTable);
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://dummyjson.com/users?limit=9&skip=${currentPage * itemPerPage}`
      )
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      });
  }, [currentPage]);
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
  //   function to sort user
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
  //   function to add user
  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = e.target;
    const firstName = formData.firstName.value;
    const lastName = formData.firstName.value;
    const email = formData.email.value;
    const address = {
      address: formData.address.value,
      city: formData.city.value,
    };
    const image = formData.image.value;
    const company = { name: formData.companyName.value };
    const AddData = { firstName, lastName, email, address, image, company };
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AddData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prev) => [...prev, data]);
        toast.success("User added successfully!");
        closeModal();
      });
  };
  //   Pagination calculation and functions
  const itemPerPage = 9;
  const numberOfPages = Math.ceil(100 / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      {/* Search and Sorting Options */}
      <div className="flex flex-col md:flex-row justify-center mb-5 gap-5 md:gap-0 ">
        <div className="w-2/3 md:w-1/2 mx-auto">
          <input
            className="input input-bordered input-accent input-md text-black w-full"
            type="text"
            placeholder="Search by name..."
            onChange={handleSearch}
          />
        </div>
        <div className="mx-auto">
          <select
            className="input input-bordered input-accent input-md text-accent"
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
      <div className="flex flex-col md:flex-row justify-center text-center mb-5 gap-3 md:gap-10">
        <div onClick={openModal}>
          <Button text={"Add New User"} />
        </div>
        {showTable ? (
          <div onClick={handleTableView} className="justify-end">
            <Button text={"Card View"} />
          </div>
        ) : (
          <div onClick={handleTableView} className="justify-end">
            <Button text={"Table View"} />
          </div>
        )}
      </div>
      {showTable ? (
        <>
          {/* Table View */}
          <div>
            <Table users={users} />
          </div>
        </>
      ) : (
        <>
          {/* Card View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mx-3 md:mx-10 mb-10">
            {users?.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </>
      )}
      {/* Pagination */}
      <div className="flex flex-wrap flex-row mx-auto justify-center pb-10 gap-2 w-11/12">
        <button
          className="btn btn-sm lg:btn-md btn-accent"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-accent btn btn-sm lg:btn-md btn-outline"
                : "btn  btn-sm lg:btn-md  btn-outline "
            }
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          className="btn btn-sm lg:btn-md btn-accent"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="add User Modal"
      >
        {/* Close button of left side */}
        <div className="card-actions justify-end">
          <div onClick={closeModal} className=" btn btn-circle btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div>
          <form onSubmit={handleAddUser}>
            <div className="flex flex-col md:flex-row  md:gap-2">
              {/* First Name */}
              <div className="form-control  md:w-1/2">
                <label className="label">
                  <span className="label-text">First Name:</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name Here..."
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Last Name */}
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Last Name:</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name Here..."
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-2">
              {/* Email */}
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Here..."
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Photo */}
              <div className="form-control  md:w-1/2">
                <label className="label">
                  <span className="label-text">Avatar:</span>
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="your avatar Link "
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row  md:gap-2">
              {/* address */}
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text">Address:</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address Here..."
                  className="input input-bordered"
                  required
                />
              </div>
              {/* City */}
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text">City:</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City Here..."
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Company Name */}
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text">Company Name:</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name Here..."
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-12 text-center flex-col md:flex-row justify-evenly gap-5">
              <div>
                <Button text={"Add "} />
              </div>
              <div onClick={closeModal}>
                <Button text={"Close"} />
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {loading && <Loading />}
    </>
  );
};
export default Home;
