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
