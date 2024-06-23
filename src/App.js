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
