import React, { useEffect, useState } from "react";
import "./style/App.css";
import people from "./utils/people.json";
import FilterBar from "./components/FilterBar/FilterBar";
import ListPeople from "./components/ListPeople/ListPeople";
import PopUp from "./components/PopUp/PopUp";

function App() {
  const [peopleData, setPeopleData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filteredPeopleData, setFilteredPeopleData] = useState([]);

  useEffect(() => {
    setPeopleData(people.map((person, index) => ({ ...person, id: index })));
  }, []);

  useEffect(() => {
    setFilteredPeopleData(peopleData);
  }, [peopleData]);
console.log(peopleData);
  const togglePopup = (person) => {
    setSelectedPerson(person);
    setShowPopup(!showPopup);
  };

  const addPerson = (newPerson) => {
    setPeopleData([...peopleData, newPerson]);
  };

  const deletePerson = (personId) => {
    const newPeopleData = peopleData.filter(
      (person, index) => person.id !== personId
    );
    setPeopleData(newPeopleData);
  };

  const updatePerson = (id, newPerson) => {
    const newPeopleData = [...peopleData];
    const personIndex = newPeopleData.findIndex((person) => person.id === id);

    newPeopleData[personIndex] = newPerson;
    setPeopleData(newPeopleData);
  };

  const handleFilter = (name, department) => {
    let newFilteredData = [...peopleData];

    if (name) {
      newFilteredData = newFilteredData.filter((person) =>
        person.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (department) {
      newFilteredData = newFilteredData.filter(
        (person) => person.department == department
      );
    }

    setFilteredPeopleData(newFilteredData);
  };

  return (
    <div className="App">
      <FilterBar onFilter={handleFilter} />
      <div className="list">
        <ListPeople
          filteredPeopleData={filteredPeopleData}
          onDelete={deletePerson}
          onEdit={togglePopup}
        />
        <button
          className="add-person"
          onClick={() => {
            togglePopup(null);
          }}
        >
          Add Person
        </button>
      </div>

      <div className={`overlay ${showPopup ? "active" : ""}`}>
        {showPopup && (
          <PopUp
            person={selectedPerson}
            onSave={addPerson}
            onClose={togglePopup}
            onUpdate={updatePerson}
            peopleData={peopleData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
