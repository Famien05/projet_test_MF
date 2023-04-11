import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Modal, Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import logo from './logo.jpg';


function AcronymsPage() {
  const [acronyms, setAcronyms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const acronymsPerPage = 10;

  useEffect(() => {
    async function fetchAcronyms() {
      try {
        const response = await axios.get('http://localhost:5000/acronyms');
        setAcronyms(response.data);
      } catch (error) {
        console.error('Error fetching acronyms:', error);
      }
    }

    fetchAcronyms();
  }, []);

  async function addAcronym(acronym, meaning) {
    try {
      await axios.post('http://localhost:5000/acronyms', {
        acronym,
        meaning,
      });
      setAcronyms({ ...acronyms, [acronym]: meaning });
      toast.success('Acronym added successfully');
    } catch (error) {
      console.error('Error adding acronym:', error);
      toast.error('Error adding acronym');
    }
  }

  async function updateAcronym(acronym, newMeaning) {
    try {
      await axios.put(`http://localhost:5000/acronyms/${acronym}`, {
        meaning: newMeaning,
      });
      setAcronyms({ ...acronyms, [acronym]: newMeaning });
      toast.success('Acronym updated successfully');
    } catch (error) {
      console.error('Error updating acronym:', error);
      toast.error('Error updating acronym');
    }
  }

  async function deleteAcronym(acronym) {
    try {
      await axios.delete(`http://localhost:5000/acronyms/${acronym}`);
      const newAcronyms = { ...acronyms };
      delete newAcronyms[acronym];
      setAcronyms(newAcronyms);
      toast.success('Acronym deleted successfully');
    } catch (error) {
      console.error('Error deleting acronym:', error);
      toast.error('Error deleting acronym');
    }
  }

  const filteredAcronyms = Object.entries(acronyms).filter(([key, value]) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAcronym = currentPage * acronymsPerPage;
  const indexOfFirstAcronym = indexOfLastAcronym - acronymsPerPage;
  const currentAcronyms = filteredAcronyms.slice(indexOfFirstAcronym, indexOfLastAcronym);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAcronyms.length / acronymsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <Pagination.Item
      key={number}
      active={number === currentPage}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </Pagination.Item>
  ));

  return (
    <div className="App">
      <Header />
      <h1>Acronyms</h1>
      <AddAcronymForm onAdd={addAcronym} />
      <Form.Control
                type="text"
                placeholder="Search acronyms"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
              />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Acronym</th>
                    <th>Meaning</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAcronyms.map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                      <td>
                        <UpdateAcronymForm
                          acronym={key}
                          meaning={value}
                          onUpdate={updateAcronym}
                        />
                        <Button
                          variant="danger"
                          onClick={() => deleteAcronym(key)}
                          className="ml-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>{renderPageNumbers}</Pagination>
              <ToastContainer />
            </div>
          );
        }
        
        function AddAcronymForm({ onAdd }) {
          const [acronym, setAcronym] = useState('');
          const [meaning, setMeaning] = useState('');
        
          function handleSubmit(e) {
            e.preventDefault();
            if (acronym.trim() === '' || meaning.trim() === '') {
              toast.error('Both fields must be filled');
              return;
            }
            onAdd(acronym, meaning);
            setAcronym('');
            setMeaning('');
          }
        
          return (
            <Form onSubmit={handleSubmit} className="mb-3">
              <Form.Group>
                <Form.Label>Acronym</Form.Label>
                <Form.Control
                  type="text"
                  value={acronym}
                  onChange={(e) => setAcronym(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Meaning</Form.Label>
                <Form.Control
                  type="text"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                />
              </Form.Group>
              <Button type="submit">Add Acronym</Button>
            </Form>
          );
        }
        
        function UpdateAcronymForm({ acronym, meaning, onUpdate }) {
          const [show, setShow] = useState(false);
          const [newMeaning, setNewMeaning] = useState(meaning);
        
          const handleClose = () => setShow(false);
          const handleShow = () => setShow(true);
        
          function handleSubmit(e) {
            e.preventDefault();
            onUpdate(acronym, newMeaning);
            handleClose();
          }
        
          return (
            <>
              <Button variant="warning" onClick={handleShow} className="mr-2">
                Update
              </Button>
        
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update {acronym}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Control
                      type="text"
                      value={newMeaning}
                      onChange={(e) => setNewMeaning(e.target.value)}
                    />
                    <Button type="submit" className="mt-2">
                      Update Acronym
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          );
        }
        
        function Header() {
          return (
            <header>
              <img src={logo} alt="Logo" className="logo" />
              <h1>Acronyms</h1>
            </header>
         
         );
        }
        
        export default AcronymsPage;
                