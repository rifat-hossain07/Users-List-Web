import TableRow from "./TableRow";

/* eslint-disable react/prop-types */
const Table = ({ users }) => {
  return (
    <div className="overflow-auto h-[550px]  ">
      <table className="table table-pin-rows z-0 ">
        {/* head */}
        <thead className="divide-y divide-gray-200   text-black">
          <tr className="bg-accent">
            <th className="border border-black">#</th>
            <th className="border border-black">Avatar</th>
            <th className="border border-black">First Name</th>
            <th className="border border-black">Last Name</th>
            <th className="border border-black">Email</th>
            <th className="border border-black">Address</th>
            <th className="border border-black">City</th>
            <th className="border border-black">Company</th>
            <th className="border border-black">Details</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
