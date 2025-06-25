import React from "react";

const PrintDetails = React.forwardRef(({ users }, ref) => (
  <div ref={ref}>
    <h1>Printable User Report</h1>

    {Array.isArray(users) && users.length > 0 ? (
      users.map((user, i) => (
        <div key={i}>
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.gmail}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <hr />
        </div>
      ))
    ) : (
      <p>No users to display.</p>
    )}
  </div>
));

export default PrintDetails;
