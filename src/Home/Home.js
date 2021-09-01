import React, { useEffect, useState } from "react";
import { Table, Space, Button, Alert, Modal, Row, Col } from "antd";
import "antd/dist/antd.css";
import FormButton from "../Components/FormButton/FormButton";
import "./Home.css";
import FormInput from "../Components/FormInput/FormInput";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userSetDataState, setUserSetDataState] = useState([]);
  const [modalData, setModalData] = useState();
  const [gotModalData, setGotModalData] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [showCreateUserScreen, setShowCreateUserScreen] = useState(false);
  const [newFirstName, setNewFirstNameState] = useState();
  const [newLastNameState, setNewLastNameState] = useState("");
  const [newEmailState, setNewEmailState] = useState("");
  const [newAgeState, setNewAgeState] = useState();
  useEffect(() => {
    getAllUsers().then((data) => {
      setUserSetDataState(data);
      console.log(data);
    });
  }, []);
  //Consuming /getAll end-point
  const getAllUsers = async () => {
    const response = await fetch("http://localhost:27027/getAll");
    const data = await response.json();
    return data;
  };

  //Consuming /get/{id} end-point
  const getUser = async (recordId) => {
    const response = await fetch("http://localhost:27027/get/" + recordId);
    const data = await response.json();
    setModalData(data[0]);
    setGotModalData(true);
  };

  //Consuming /update/{id} end-point
  const updateUser = async () => {
    //constructing data for orm
    var data = {
      _id: modalData._id,
      firstname: modalData.firstname,
      lastname: modalData.lastname,
      email: modalData.email,
      age: modalData.age,
    };
    fetch("http://localhost:27027/update/" + modalData._id, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => response.json(data))
      .then((data) => {
        alert("Success", data);
      })
      .catch((error) => {
        alert("Error", error);
        console.log(error);
      })
      .then(() => {
        window.location.pathname = "/";
      });
  };

  //Consuming /create end-point
  const createUser = () => {
    //constructing data for orm
    var data = {
      _id: "",
      firstname: newFirstName,
      lastname: newLastNameState,
      email: newEmailState,
      age: newAgeState,
    };

    fetch("http://localhost:27027/create/", {
      method: "POST",
      cache: "no-cache",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(data))
      .then((data) => {
        alert("Success", data);
      })
      .catch((error) => {
        alert("Error", error);
      })
      .then(() => {
        window.location.pathname = "/";
      });
  };
  //Consuming /delete/{id} end-point
  const deleteUser = () => {
    console.log("geldi" + modalData._id);
    fetch("http://localhost:27027/delete/" + modalData._id, {
      method: "DELETE",
      cache: "no-cache",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.pathname = "/";
    });
  };
  //in order to show deletion box
  const deleteUserAlert = () => {
    setAlertVisible(true);
  };

  //columns of table
  const columns = [
    {
      title: "ID ",
      dataIndex: "_id",
      key: Math.floor(Math.random() * 1000) + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: Math.floor(Math.random() * 1000) + 1,
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: Math.floor(Math.random() * 1000) + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: Math.floor(Math.random() * 1000) + 1,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: Math.floor(Math.random() * 1000) + 1,
    },
  ];

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <div className="home-main-wrapper">
      <div>
        <FormButton
          style={{
            backgroundColor: "#00a6b9",
            borderColor: "#00a6b9",
            borderRadius: 5,
            color: "white",
            marginTop: 20,
            marginBottom: 5,
            width: 140,
            alignSelf: "flex-end",
          }}
          onClick={() => setShowCreateUserScreen(!showCreateUserScreen)}
        >
          {!showCreateUserScreen ? "New" : "Return to table"}
        </FormButton>
        {!showCreateUserScreen && (
          <div className="home-table-contailer">
            <Table
              className="components-table-demo-nested"
              columns={columns}
              dataSource={userSetDataState}
              style={{ textAlign: "center" }}
              onRow={(record) => ({
                onClick: () => {
                  getUser(record._id);
                  setIsVisible(true);
                },
              })}
            />
          </div>
        )}
        {showCreateUserScreen && (
          <div className="home-create-user-screen-container">
            <div className="rightSide">
              <FormInput
                onChange={(e) => setNewFirstNameState(e.target.value)}
                placeholder="First Name"
                style={{
                  width: "auto",
                  minWidth: 450,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />
              <FormInput
                onChange={(e) => setNewLastNameState(e.target.value)}
                placeholder="Last Name"
                style={{
                  width: "auto",
                  minWidth: 450,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />
              <FormInput
                onChange={(e) => setNewAgeState(e.target.value)}
                placeholder="Age"
                style={{
                  width: "auto",
                  minWidth: 450,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />

              <FormInput
                onChange={(e) => setNewEmailState(e.target.value)}
                placeholder="Email"
                style={{
                  width: "auto",
                  minWidth: 450,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />
              <FormButton
                style={{
                  backgroundColor: "#00a6b9",
                  borderColor: "#00a6b9",
                  borderRadius: 5,
                  color: "white",
                  marginTop: 20,
                  marginBottom: 5,
                  width: 140,
                  alignSelf: "flex-end",
                }}
                onClick={createUser}
              >
                Create
              </FormButton>
            </div>
          </div>
        )}

        <Modal
          title="User Information"
          visible={isVisible}
          onCancel={handleCancel}
          width={920}
          footer={[
            <Button key="back" onClick={deleteUserAlert}>
              Delete
            </Button>,
            <Button
              style={{
                backgroundColor: "#00a6b9",
                borderColor: "#00a6b9",
                borderRadius: 5,
                color: "white",
              }}
              onClick={updateUser}
            >
              Save
            </Button>,
          ]}
        >
          <Row gutter={20}>
            <Col xs={2} xl={12}>
              <p>ID:</p>
              <FormInput
                disabled={true}
                value={gotModalData ? modalData._id : ""}
                style={{
                  width: "auto",
                  minWidth: 420,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />
            </Col>

            <Col xs={2} xl={12}>
              <p>First Name: </p>
              <FormInput
                value={gotModalData ? modalData.firstname : ""}
                style={{
                  width: "auto",
                  minWidth: 420,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                onChange={(event) => {
                  setModalData((prev) => ({
                    ...prev,
                    firstname: event.target.value,
                  }));
                }}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={2} xl={12}>
              <p>Last Name: </p>
              <FormInput
                placeholder="Last Name"
                value={gotModalData ? modalData.lastname : ""}
                style={{
                  width: "auto",
                  minWidth: 420,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                onChange={(event) => {
                  setModalData((prev) => ({
                    ...prev,
                    lastname: event.target.value,
                  }));
                }}
              />
            </Col>

            <Col xs={2} xl={12}>
              <p>Email: </p>
              <FormInput
                placeholder="Email"
                value={gotModalData ? modalData.email : ""}
                style={{
                  width: "auto",
                  minWidth: 420,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                onChange={(event) => {
                  setModalData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={2} xl={12}>
              <p>Age:</p>
              <FormInput
                value={gotModalData ? modalData.age : ""}
                placeholder={"Age"}
                style={{
                  width: "auto",
                  minWidth: 420,
                  height: 50,
                  margin: 1,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                onChange={(event) => {
                  setModalData((prev) => ({
                    ...prev,
                    age: event.target.value,
                  }));
                }}
              />
            </Col>
          </Row>

          {alertVisible && (
            <Alert
              message="Delete User"
              description="Are you sure you want to delete the user?"
              type="info"
              action={
                <Space direction="vertical">
                  <FormButton
                    size="small"
                    type="primary"
                    onClick={() => deleteUser()}
                  >
                    Yes
                  </FormButton>
                  <FormButton
                    size="small"
                    danger
                    type="ghost"
                    onClick={() => setAlertVisible(false)}
                  >
                    No
                  </FormButton>
                </Space>
              }
              closable
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Home;
