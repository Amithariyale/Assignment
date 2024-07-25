import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyTable = () => {
  const data = useSelector((state) => state.data.tableData);
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
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td className="d-flex gap-2 align-items-center">
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
