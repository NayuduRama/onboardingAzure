import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Modal, Row, Col, Form } from 'react-bootstrap';


function Stores() {
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState([])
    const [display, setDisplay] = React.useState(false);
    const [displayEdit, setDisplayEdit] = React.useState(false);
    const [displayDelete, setDisplayDelete] = React.useState(false);
    const getStores = async () => {
        const res = await Axios.get('https://localhost:44352/api/StoresNew');
        setStores(res.data);
    }

    useEffect(() => {
        getStores();
    }, []);


    const handleAddStore = (event) => {
        event.preventDefault();
        setDisplay(false);
        console.log(event.target.StoreName.value, event.target.StoreAddress.value);
        Axios.post('https://localhost:44352/api/StoresNew', {
            Name: event.target.StoreName.value,
            Address: event.target.StoreAddress.value,
        }).then((res) => {
            console.log(res.status);
            window.location.reload(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleEditStore = (event) => {
        event.preventDefault();
        setDisplay(false);
        store.Name = event.target.StoreName.value;
        store.Address = event.target.StoreAddress.value;
        console.log(event.target.StoreName.value, event.target.StoreAddress.value);
        Axios.put(`https://localhost:44352/api/StoresNew/${store.Id}`, store).then((res) => {
            console.log(res.status);
            window.location.reload(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }
    const preHnadleEditStore = (store) => {
        setDisplayEdit(true);
        setStore(store);
        console.log("Pre handle edit");
        console.log(store)
    };

    const handleDeleteStore = (event) => {
        event.preventDefault();
        setDisplay(false);
        Axios.delete(`https://localhost:44352/api/StoresNew/${store.Id}`).then((res) => {
            console.log(res.status);
            window.location.reload(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const preHnadleDeleteStore = (store) => {
        setDisplayDelete(true);
        setStore(store);
        console.log("Delete");
        console.log(store)
    };
    return (
        <div className='container'>
            <div>
                <div>
                    {/* Add a new customer */}
                    <ButtonToolbar>
                        <Modal show={display} onHide={() => setDisplay(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add A New Store</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col sm={6}>
                                        <Form onSubmit={handleAddStore}>
                                            <Form.Group controlId="StoreName">
                                                <Form.Label>Store Name</Form.Label>
                                                <Form.Control type="text" name="StoreName" required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="StoreAddress">
                                                <Form.Label>Store address</Form.Label>
                                                <Form.Control type="text" name="StoreAddress" required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Add Store
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-danger" onClick={() => setDisplay(false)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <Button variant='primary' onClick={() => setDisplay(true)}>
                            Add Store
                        </Button>
                    </ButtonToolbar>
                </div>
                {/* Edit customer modal */}
                <Modal show={displayEdit} onHide={() => setDisplayEdit(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Customer Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={handleEditStore}>
                                    <Form.Group controlId="StoreName">
                                        <Form.Label>Store Name</Form.Label>
                                        <Form.Control
                                            defaultValue={store.Name}
                                            type="text" name="StoreName" required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="StoreAddress">
                                        <Form.Label>Store address</Form.Label>
                                        <Form.Control
                                            defaultValue={store.Address}
                                            type="text" name="StoreAddress" required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <button className="btn btn-success" type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path> </svg>
                                        </button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-danger" onClick={() => setDisplay(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {/* Delete customer modal */}
                <Modal show={displayDelete} onHide={() => setDisplayDelete(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                Are you sure?
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" type="submit" onClick={handleDeleteStore}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path> </svg>
                        </button>
                        <Button className="btn btn-dark" onClick={() => setDisplayDelete(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <Table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.Id}>
                            <td>{store.Name}</td>
                            <td>{store.Address}</td>
                            <td>
                                <button type="button" className="btn btn-success" onClick={() => preHnadleEditStore(store)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    Edit Store
                                </button>
                            </td>
                            <td> 
                                <button type="button" className="btn btn-outline-danger" onClick={() => preHnadleDeleteStore(store)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                                    </svg>
                                    Delete
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>

        </div>
    );

}

export default Stores;