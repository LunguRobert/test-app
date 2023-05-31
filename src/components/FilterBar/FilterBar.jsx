import React from "react";
import { useState } from "react";
import "./style/FilterBar.css";

export default function FilterBar(props) {
  const { onFilter } = props;

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <div className="bar">
      <input
        placeholder="Name..."
        type="text"
        value={name}
        onChange={handleNameChange}
      />

      <select value={department} onChange={handleDepartmentChange}>
        <option value="">Department</option>
        <option value="1">IT</option>
        <option value="2">Marketing</option>
      </select>
      <button
        onClick={() => {
          onFilter(name, department);
        }}
      >
        Search
      </button>
    </div>
  );
}
