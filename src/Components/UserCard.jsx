import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  return (
    <div>
      <div className="card  h-56 card-side bg-accent text-black shadow-accent shadow-md border-2 border-accent items-center">
        <div className="text-center w-1/3 p-5">
          <figure>
            <img className="w-2/3" src={user.image} alt="Shoes" />
          </figure>
          <Link className="link link-hover" to={`/details/${user.id}`}>
            <h2 className=" font-medium mt-2">
              {user.firstName} {user.lastName}
            </h2>
          </Link>
        </div>
        {/* <div className="divider divider-horizontal"></div> */}
        <div className="card-body p-1">
          <div className="flex justify-between"></div>
          <p>
            <span className="font-medium">Email: </span> {user.email}
          </p>
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
