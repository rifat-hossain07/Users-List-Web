import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  return (
    <div>
      <div className="card   bg-accent text-black shadow-accent shadow-md  items-center">
        <div className="text-center flex justify-start gap-5 items-center p-5">
          <div>
            <img className="w-16" src={user.image} alt="Shoes" />
          </div>
          <Link className="link link-hover" to={`/details/${user.id}`}>
            <div className=" font-medium mt-2">
              {user.firstName} {user.lastName}
            </div>
          </Link>
        </div>
        <div className=" p-1 space-y-2">
          <div className="flex  justify-between"></div>
          <div className="">
            <span className="font-medium ">Email: </span> {user.email}
          </div>
          <p>
            <span className="font-medium">Address: </span>
            {user.address.address}
          </p>
          <p>
            <span className="font-medium">City: </span>
            {user.address.city}
          </p>

          <p>
            <span className="font-medium">company:</span> {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
