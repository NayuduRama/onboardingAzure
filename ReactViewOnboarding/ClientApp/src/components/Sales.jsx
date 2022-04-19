import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Modal, Row, Col, Form } from 'react-bootstrap';

function Sales() {
    const [sales, setSales] = useState([]);
    const [sale, setSale] = useState([])
    const [display, setDisplay] = React.useState(false);
    const [displayEdit, setDisplayEdit] = React.useState(false);
    const [displayDelete, setDisplayDelete] = React.useState(false);


    const getSales = async () => {
        const res = await Axios.get('https://localhost:44352/api/SalesNew');
        setSales(res.data);
    }
    useEffect(() => {
        getSales();
    }, []);
    console.log(sales);

    const handleAddSale = (event) => {
        event.preventDefault();
        setDisplay(false);
        console.log(event.target.CustomerName.value, event.target.CustomerAddress.value);
        Axios.post('https://localhost:44352/api/SalesNew', {
            Name: event.target.CustomerName.value,
            Address: event.target.CustomerAddress.value,
        }).then((res) => {
            console.log(res.status);
            window.location.reload(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleEditSale = (event) => {
        event.preventDefault();
        setDisplay(false);
        sale.Name = event.target.CustomerName.value;
        sale.Address = event.target.CustomerAddress.value;
        console.log(event.target.CustomerName.value, event.target.CustomerAddress.value);
        Axios.put(`https://localhost:44352/api/CustomersNew/${sale.Id}`, sale).then((res) => {
            console.log(res.status);
            window.location.reload(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }
    const preHnadleEditSale = (sale) => {
        setDisplayEdit(true);
        setSale(sale);
        console.log("Pre handle edit");
        console.log(sale)
    };
    const handleDeleteSale = (event) => {
        event.preventDefault();
        setDisplay(false);
        Axios.delete(`https://localhost:44352/api/SalesNew/${sale.Id}`).then((res) => {
            console.log(res.status);
            window.location.reload(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const preHnadleDeleteSale = (sale) => {
        setDisplayDelete(true);
        setSale(sale);
        console.log("Delete");
        console.log(sale)
    };
    return (
        <>
            <div className='container'>
                <div>
                    {/* Add new sales */}
                    <div>
                        <ButtonToolbar>
                            <Modal show={display} onHide={() => setDisplay(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add a new sale</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col sm={6}>
                                            <Form onSubmit={handleAddSale}>
                                                <Form.Group controlId="CustomerName">
                                                    <Form.Label>Customer Name</Form.Label>
                                                    <Form.Control type="text" name="CustomerName" required
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="ProductName">
                                                    <Form.Label>Product Name</Form.Label>
                                                    <Form.Control type="text" name="ProductName" required
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="StoreName">
                                                    <Form.Label> Store Name</Form.Label>
                                                    <Form.Control type="text" name="StoreName" required
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Button variant="primary" type="submit">
                                                        Add Customer
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
                                Add Sale
                            </Button>
                        </ButtonToolbar>
                    </div>
                    {/* Edit Sale */}
                    <div>
                        <Modal show={displayEdit} onHide={() => setDisplayEdit(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Customer Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col sm={6}>
                                        <Form onSubmit={handleEditSale}>
                                            <Form.Group controlId="CustomerName">
                                                <Form.Label>Customer Name</Form.Label>
                                                <Form.Control
                                                    defaultValue={sale.Name}
                                                    type="text" name="CustomerName" required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="CustomerAddress">
                                                <Form.Label>Customer address</Form.Label>
                                                <Form.Control
                                                    defaultValue={sale.Address}
                                                    type="text" name="CustomerAddress" required
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
                    </div>
                    {/* Delete Sale Model */}
                    <div>
                        <Modal show={displayDelete} onHide={() => setDisplayDelete(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Sale</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col sm={6}>
                                        Are you sure?
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-danger" type="submit" onClick={handleDeleteSale}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path> </svg>
                                </button>
                                <Button className="btn btn-dark" onClick={() => setDisplayDelete(false)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Customer </th>
                            <th>Product </th>
                            <th>Store </th>
                            <th>Date Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr key={sale.Id}>
                                <td>{sale.Customer.Name}</td>
                                <td>{sale.Product.Name}</td>
                                <td>{sale.Store.Name}</td>
                                <td>{sale.DateSold}</td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={() => preHnadleEditSale(sale)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                        </svg>
                                        Edit Customer
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => preHnadleDeleteSale(sale)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    );

}

export default Sales;