# React CURD Application - Component Based

## Check It!

[https://dev-arindam-roy.github.io/react-curd-management-component/](https://dev-arindam-roy.github.io/react-curd-management-component/)

## App.js
```js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  FiUserPlus,
  FiPlus,
  FiUserCheck,
  FiSave,
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import {sexList} from './Data.js';
import UserListTable from  './components/UserListTable.js';
import AddEditUserForm from './components/AddEditUserForm.js';

const userInitObj = {
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  designation: '',
  role: '',
  sex: (sexList.length > 0 ) ? sexList[0] : 'Male',
  skill_set: [],
  biography: '',
  is_agree: false,
};

const App = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [user, setUser] = useState(userInitObj);
  const [userList, setUserList] = useState([]);
  const [isEditModeOn, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState('');

  const modalFormSubmitBtnHandler = () => {
    document.getElementById('modalFormSubmitHiddenBtn').click();
  };

  const modalFormSubmitHandler = (e) => {
    e.preventDefault();
    if (isEditModeOn && editIndex !== '') {
      updateUser();
    } else {
      addNewUser();
    }
    
  };

  const addNewUser = () => {
    Swal.fire({
      title: 'Please wait...',
      html: 'System is <strong>processing</strong> your request',
      timer: 4000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.close();
      //console.log(user);
      //new entry will add first
      setUserList([user, ...userList]);
      //setUserList([...userList, user]);
      //console.log(userList);
      setUser(userInitObj);
      setIsModalShow(false);
      toast.success('User has been added successfully');
    });
  }

  const updateUser = () => {
    Swal.fire({
      title: 'Please wait...',
      html: 'System is <strong>processing</strong> your request',
      timer: 4000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.close();
      let _tempUserList = [...userList];
      _tempUserList[editIndex] = user;
      setUserList(_tempUserList);
      setUser(userInitObj);
      setIsModalShow(false);
      toast.success('User has been updated successfully');
      setEditMode(false);
      setEditIndex('');
    });
  }

  const deleteUserHandler = (evt, index) => {
    evt.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, Delete User',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Please wait...',
          html: 'System is <strong>processing</strong> your request',
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          console.log(result);
          let _tempUserList = [...userList];
          _tempUserList.splice(index, 1);
          setUserList(_tempUserList);
          setUser(userInitObj);
          Swal.fire({
            title: 'Done!',
            html: 'User has been deleted successfully<br/><strong>Thankyou!</strong>',
            icon: 'success',
            confirmButtonColor: '#0d6efd',
          });
        });
      }
    });
  };

  const editUserHandler = (evt, index) => {
    evt.preventDefault();
    setUser(userList[index]);
    setEditMode(true);
    setEditIndex(index);
    setIsModalShow(true);
  };

  const clearAllHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to clear all the records',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, Clear All',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Please wait...',
          html: 'System is <strong>processing</strong> your request',
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          console.log(result);
          setUserList([]);
          setUser(userInitObj);
          setEditMode(false);
          setEditIndex('');
          Swal.fire({
            title: 'Done!',
            text: 'All users has been deleted',
            icon: 'success',
            confirmButtonColor: '#0d6efd',
          });
        });
      }
    });
  };

  const addUserModalHandler = () => {
    setUser(userInitObj);
    setEditMode(false);
    setEditIndex('');
    setIsModalShow(true);
  };

  const modalCloseHandler = () => {
    setUser(userInitObj);
    setEditMode(false);
    setEditIndex('');
    setIsModalShow(false);
  };
  return (
    <>
      <Container fluid='md'>
        <Row className='mt-3'>
          <Col xs={12} md={12}>
            <h1>
              <strong>Onex CRUD App!</strong>
            </h1>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xs={12} md={12}>
            <UserListTable 
              userList={userList} 
              addUserModalHandler={addUserModalHandler}
              clearAllHandler={clearAllHandler}
              deleteUserHandler={deleteUserHandler}
              editUserHandler={editUserHandler} 
            />
          </Col>
        </Row>
        <Modal
          backdrop='static'
          keyboard={false}
          show={isModalShow}
          onHide={modalCloseHandler}
          size='lg'
          centered
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditModeOn && editIndex !== '' ? (
                <span>
                  <FiUserCheck className='onex-heading-icons' /> Edit User
                </span>
              ) : (
                <span>
                  <FiUserPlus className='onex-heading-icons' /> Add User
                </span>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEditUserForm 
              modalFormSubmitHandler={modalFormSubmitHandler}
              user={user}
              setUser={setUser} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={modalCloseHandler}>
              Close
            </Button>
            {isEditModeOn && editIndex !== '' ? (
              <Button variant='primary' onClick={modalFormSubmitBtnHandler}>
                <FiSave className='onex-btn-icons' /> Save changes
              </Button>
            ) : (
              <Button variant='primary' onClick={modalFormSubmitBtnHandler}>
                <FiPlus className='onex-btn-icons' /> Add User
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
          className='onex-toast'
        />
      </Container>
    </>
  );
};

export default App;
```

## AddEditUserForm.js - Component
```js
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {designationList, roleList, sexList, skillSetList} from '../Data.js';

const AddEditUserForm = ({
    modalFormSubmitHandler,
    user,
    setUser
}) => {
    console.log(user);
  return (
    <>
      <Form onSubmit={modalFormSubmitHandler}>
        <Row>
          <Col md={6} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userFirstName">
              <Form.Label>
                First Name: <em>*</em>
              </Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                maxLength={20}
                placeholder="First Name"
                required
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userLastName">
              <Form.Label>
                Last Name: <em>*</em>
              </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                maxLength={20}
                placeholder="Last Name"
                required
                value={user.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userEmailId">
              <Form.Label>
                Email Id: <em>*</em>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                maxLength={60}
                placeholder="Email-Id"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userMobileNo">
              <Form.Label>
                Mobile No: <em>*</em>
              </Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                minLength={10}
                maxLength={12}
                placeholder="Mobile No"
                required
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userDesignation">
              <Form.Label>
                Designation: <em>*</em>
              </Form.Label>
              <Form.Select
                name="designation"
                required
                value={user.designation}
                onChange={(e) =>
                  setUser({ ...user, designation: e.target.value })
                }
              >
                <option value="">-Select Designation-</option>
                {designationList.length > 0 &&
                  designationList.map((item, index) => {
                    return (
                      <option value={item.id} key={"designation" + index}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userRoles">
              <Form.Label>
                Role (s): <em>*</em>
              </Form.Label>
              <Form.Select
                name="role"
                required
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="">-Select Role-</option>
                {roleList.length > 0 &&
                  roleList.map((item, index) => {
                    return (
                      <option value={item.id} key={"role" + index}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userSex">
              <Form.Label>
                Select Sex: <em>*</em>
              </Form.Label>
              <div className="mx-3">
                {sexList.length > 0 &&
                  sexList.map((item, index) => {
                    return (
                      <Form.Check
                        inline
                        label={item}
                        name="sex"
                        type="radio"
                        id={"sex" + index}
                        key={"sex" + index}
                        value={item}
                        required
                        checked={user.sex === item ? true : false}
                        onChange={(e) =>
                          setUser({ ...user, sex: e.target.value })
                        }
                      />
                    );
                  })}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userSkillSets">
              <Form.Label>
                Select Skill Set: <em>*</em>
              </Form.Label>
              <div className="mx-3">
                {skillSetList.length > 0 &&
                  skillSetList.map((item, index) => {
                    return (
                      <Form.Check
                        label={item.skill}
                        name={"skill_set[" + index + "]"}
                        id={"skillSet" + index}
                        key={"skillSet" + index}
                        value={item.id}
                        required={user.skill_set.length === 0}
                        checked={user.skill_set.some(
                          (obj) => obj.id === item.id
                        )}
                        onChange={(e) =>
                          e.target.checked
                            ? setUser({
                                ...user,
                                skill_set: [...user.skill_set, item],
                              })
                            : setUser({
                                ...user,
                                skill_set: user.skill_set.filter(
                                  (obj) => obj.id !== parseInt(e.target.value)
                                ),
                              })
                        }
                      />
                    );
                  })}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userBiography">
              <Form.Label>
                Biography (Short): <em>*</em>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="biography"
                rows={3}
                maxLength={90}
                placeholder="Short Biography..."
                required
                value={user.biography}
                onChange={(e) =>
                  setUser({ ...user, biography: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <Form.Group className="mb-3" controlId="userIsAgree">
              <Form.Check
                type="switch"
                id="isUserAgreed"
                label="Yes, I am agree to join"
                checked={user.is_agree}
                onChange={(e) =>
                  e.target.checked
                    ? setUser({ ...user, is_agree: true })
                    : setUser({ ...user, is_agree: false })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          type="submit"
          id="modalFormSubmitHiddenBtn"
          variant="secondary"
          className="d-none"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddEditUserForm;
```

## UserListTable.js - Component
```js
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {
    FiUserPlus,
    FiUsers,
    FiXSquare,
    FiTrash2,
    FiEdit,
} from 'react-icons/fi';
import {designationList, roleList} from '../Data.js';

const UserListTable = (prop) => {
  return (
    <>
        <Card>
            <Card.Header>
            <Row>
                <Col xs={12} md={4}>
                <h4>
                    <strong>
                    <FiUsers className='onex-heading-icons' /> User
                    Management
                    </strong>
                    {prop?.userList.length > 0 && (
                    <span> - ({prop.userList.length})</span>
                    )}
                </h4>
                </Col>
                <Col xs={12} md={4}></Col>
                <Col xs={12} md={4} style={{ textAlign: 'right' }}>
                <Button
                    type='button'
                    variant='primary'
                    onClick={prop.addUserModalHandler}
                >
                    <FiUserPlus className='onex-btn-icons' /> Add New User
                </Button>{' '}
                </Col>
            </Row>
            </Card.Header>
            <Card.Body>
            <Table
                striped
                bordered
                hover
                responsive
                size='sm'
                variant='dark'
            >
                <thead>
                <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Sex</th>
                    <th>Designation</th>
                    <th>Skills</th>
                    <th>Roles</th>
                    <th>Is Agreed</th>
                    <th style={{width: '60px'}}>#</th>
                </tr>
                </thead>
                <tbody>
                {prop?.userList.length > 0 &&
                    prop.userList.map((item, index) => {
                    return (
                        <tr key={'userRow' + index}>
                        <td>{index + 1}</td>
                        <td>{item.first_name + ' ' + item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.sex}</td>
                        <td>
                            {designationList.length > 0 &&
                            designationList.map((obj, i) => {
                                return (
                                obj.id === parseInt(item.designation) && (
                                    <span key={'designation' + index + i}>
                                    {obj.name}
                                    </span>
                                )
                                );
                            })}
                        </td>
                        <td>
                            {item.skill_set.length > 0 &&
                            item.skill_set.map((obj, i) => {
                                return (
                                <li key={'skills' + index + i}>
                                    {obj.skill}
                                </li>
                                );
                            })}
                        </td>
                        <td>
                            {roleList.length > 0 &&
                            roleList.map((obj, i) => {
                                return (
                                obj.id === item.role && (
                                    <span key={'role' + index + i}>
                                    {obj.name}
                                    </span>
                                )
                                );
                            })}
                        </td>
                        <td>{item.is_agree === true ? 'YES' : 'NO'}</td>
                        <td>
                            <Button
                            type='button'
                            variant='outline-danger'
                            className='onex-action-btn'
                            onClick={(e) => prop?.deleteUserHandler(e, index)}
                            >
                            <FiTrash2 className='text-light' />
                            </Button>
                            <Button
                            type='button'
                            variant='outline-danger'
                            className='mx-2 onex-action-btn'
                            onClick={(e) => prop?.editUserHandler(e, index)}
                            >
                            <FiEdit className='text-light' />
                            </Button>
                        </td>
                        </tr>
                    );
                    })}
                {prop?.userList.length === 0 && (
                    <tr>
                    <td colSpan={10}>
                        No Users Found! Please create / add users
                    </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </Card.Body>
            <Card.Footer>
            <Row>
                <Col md={6} xs={12} sm={12}>
                {prop?.userList.length > 0 && (
                    <Button
                    type='button'
                    variant='danger'
                    onClick={prop.clearAllHandler}
                    >
                    <FiXSquare className='onex-btn-icons' /> Clear All
                    </Button>
                )}
                </Col>
                <Col md={6} xs={12} sm={12}></Col>
            </Row>
            </Card.Footer>
        </Card>
    </>
  )
}

export default UserListTable
```