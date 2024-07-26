import React, { useEffect } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const MyTable = () => {
  // Use useSelector to get the isLoggedIn state and tableData from the Redux store
  const isLoggedIn = useSelector((state) => state.data.isLoggedIn);
  const data = useSelector((state) => state.data.tableData);

  // Use useNavigate from react-router to programmatically navigate
  const navigate = useNavigate();

  // Use useEffect to navigate to the auth page if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("../auth");
      return;
    }
  }, [isLoggedIn, navigate]); // Add navigate as a dependency

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date Created</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          // Map over the data array to render each user row
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td className="d-flex gap-3 align-items-center">
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
                src={`${window.location.origin}/${user.image}`}
                alt={`${user.name}'s avatar`}
                className="avatar"
              />
              {user.name}
            </td>
            <td>{user.date}</td>
            <td>{user.role}</td>
            <td>
              <span className={`status ${user.status.toLowerCase()}`}>
                {user.status}
              </span>
            </td>
            <td>
              <ButtonGroup>
                <Button variant="secondary" className="material-icons">
                  settings
                </Button>
                <Button variant="danger" className="material-icons">
                  cancel
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MyTable;
