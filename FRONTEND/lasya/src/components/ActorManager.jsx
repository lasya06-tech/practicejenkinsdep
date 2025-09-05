import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const ActorManager = () => {
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState({
    id: '',
    name: '',
    gender: '',
    experience: '',
    topRemuneration: '',
    flopMovie: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedActor, setFetchedActor] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/actorapi`;

  useEffect(() => {
    fetchAllActors();
  }, []);

  // ✅ Fetch all actors
  const fetchAllActors = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setActors(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
    } catch (error) {
      console.error("Fetch actors error:", error.response?.data || error.message);
      setMessage("Failed to fetch actors.");
      setActors([]);
    }
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setActor({ ...actor, [e.target.name]: e.target.value });
  };

  // ✅ Validate form
  const validateForm = () => {
    for (let key in actor) {
      if (!actor[key] || actor[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  // ✅ Add actor
  const addActor = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, actor, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage('Actor added successfully.');
      fetchAllActors();
      resetForm();
    } catch (error) {
      console.error("Add actor error:", error.response?.data || error.message);
      setMessage('Error adding actor.');
    }
  };

  // ✅ Update actor
  const updateActor = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, actor, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage('Actor updated successfully.');
      fetchAllActors();
      resetForm();
    } catch (error) {
      console.error("Update actor error:", error.response?.data || error.message);
      setMessage('Error updating actor.');
    }
  };

  // ✅ Delete actor
  const deleteActor = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllActors();
    } catch (error) {
      console.error("Delete actor error:", error.response?.data || error.message);
      setMessage('Error deleting actor.');
    }
  };

  // ✅ Get actor by ID
  const getActorById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedActor(res.data);
      setMessage('');
    } catch (error) {
      console.error("Get actor error:", error.response?.data || error.message);
      setFetchedActor(null);
      setMessage('Actor not found.');
    }
  };

  // ✅ Edit actor
  const handleEdit = (act) => {
    setActor(act);
    setEditMode(true);
    setMessage(`Editing actor with ID ${act.id}`);
  };

  // ✅ Reset form
  const resetForm = () => {
    setActor({
      id: '',
      name: '',
      gender: '',
      experience: '',
      topRemuneration: '',
      flopMovie: ''
    });
    setEditMode(false);
  };

  return (
    <div className="actor-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Actor Management</h2>

      {/* Add/Edit Form */}
      <div>
        <h3>{editMode ? 'Edit Actor' : 'Add Actor'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={actor.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={actor.name} onChange={handleChange} />
          <input type="text" name="gender" placeholder="Gender" value={actor.gender} onChange={handleChange} />
          <input type="number" name="experience" placeholder="Experience" value={actor.experience} onChange={handleChange} />
          <input type="text" name="topRemuneration" placeholder="Top Remuneration" value={actor.topRemuneration} onChange={handleChange} />
          <input type="text" name="flopMovie" placeholder="Flop Movie" value={actor.flopMovie} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addActor}>Add Actor</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateActor}>Update Actor</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Get Actor by ID */}
      <div>
        <h3>Get Actor By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getActorById}>Fetch</button>

        {fetchedActor && (
          <div>
            <h4>Actor Found:</h4>
            <pre>{JSON.stringify(fetchedActor, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Actors */}
      <div>
        <h3>All Actors</h3>
        {Array.isArray(actors) && actors.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(actor).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {actors.map((act) => (
                  <tr key={act.id}>
                    {Object.keys(actor).map((key) => (
                      <td key={key}>{act[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(act)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteActor(act.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No actors found.</p>
        )}
      </div>
    </div>
  );
};

export default ActorManager;