import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";

/* eslint-disable react/prop-types */
const Details = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://dummyjson.com/users/${id}`).then((res) => {
      setUser(res.data);
    });
    setLoading(false);
  }, [id]);
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card lg:card-side bg-accent  flex justify-between w-11/12 items-center">
          <figure>
            <img className="lg:p-10" src={user?.image} alt="Album" />
          </figure>
          <div className="card-body space-y-3">
            <div className="flex flex-col md:flex-row gap-5 ">
              <p>
                <span className="font-medium text-lg">First Name: </span>{" "}
                {user.firstName}
              </p>
              <p>
                <span className="font-medium text-lg">Middle Name: </span>{" "}
                {user?.maidenName}
              </p>
              <p>
                <span className="font-medium text-lg">Last Name: </span>{" "}
                {user.lastName}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
              <div>
                <span className="font-medium">Email: </span> {user?.email}
              </div>
              <div>
                <span className="font-medium">Phone: </span> {user?.phone}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
              <div>
                <span className="font-medium">Address: </span>
                {user?.address?.address}
              </div>
              <div>
                <span className="font-medium">City: </span>
                {user?.address?.city}
              </div>
            </div>
            <div className="grid  grid-cols-2  gap-2">
              <div>
                <span className="font-medium">Height: </span> {user?.height}
              </div>
              <div>
                <span className="font-medium">Weight: </span> {user?.weight}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {user?.company?.name}
              </p>
              <p>
                <span className="font-medium">Company Adress:</span>{" "}
                {user?.company?.address?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Details;
