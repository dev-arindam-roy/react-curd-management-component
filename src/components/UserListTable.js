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