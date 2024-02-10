import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ user }) => {
  return (
    <tr className="bg-accent">
      <td className="border border-black">{user?.id}</td>
      <td className="border border-black">
        <img className="w-16" src={user?.image} alt="" />
      </td>
      <td className="border border-black">{user?.firstName}</td>
      <td className="border border-black">{user?.lastName}</td>
      <td className="border border-black">{user?.email}</td>
      <td className="border border-black">{user?.address?.address}</td>
      <td className="border border-black">{user?.address?.city}</td>
      <td className="border border-black">{user?.company?.name}</td>
      <td className="border border-black">
        <Link className="link link-hover" to={`/details/${user.id}`}>
          Details
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
