import React, { useEffect } from "react";
import { useState } from "react";
import "./style/PopUp.css";
import { v4 as uuidv4 } from 'uuid';

export default function PopUp(props) {
  const { person, onSave, onClose, onUpdate } = props;

  const [name, setName] = useState(person ? person.name : "");
  const [department, setDepartment] = useState(person ? person.department : "");

  useEffect(() => {
    if (person) {
      setName(person.name);
      setDepartment(person.department);
    } else {
      setName("");
      setDepartment("");
    }
  }, [person]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSave = () => {
    const newPerson = {
      id: uuidv4(),
      name: name,
      department: department,
    };

    if (person) {
      onUpdate(person.id, newPerson);
    } else {
      if (name !== "" && department !== "") {
        onSave(newPerson);
      }
    }

    onClose(null);
  };

  return (
    <div className="popup">
      <div className="container-small">
        <h2>{person ? "Edit Person" : "Add Person"}</h2>
        <button
          className="close"
          onClick={() => {
            onClose(null);
          }}
        >
          x
        </button>
      </div>

      <div className="container-big">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <select value={department} onChange={handleDepartmentChange}>
          <option value="0">Departament</option>
          <option value="1">IT</option>
          <option value="2">Marketing</option>
        </select>

        <button className="save" onClick={handleSave}>
          {person ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}
