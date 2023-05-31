import React from "react";
import "./style/ListPeople.css";

export default function ListPeople(props) {
  const { filteredPeopleData, onDelete, onEdit } = props;

  return (
    <div className="list-people">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
          {filteredPeopleData.map((person, index) => {
            return (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.department == 1 ? "IT" : "Marketing"}</td>
                <td>
                  <select
                    value="0"
                    onChange={(e) => {
                      if (e.target.value === "1") {
                        onDelete(person.id);
                      } else if (e.target.value === "2") {
                        onEdit({
                          id: person.id,
                          name: person.name,
                          department: person.department,
                        });
                      }
                    }}
                  >
                    <option value="0">Select Action</option>
                    <option value="1">Delete</option>
                    <option value="2">Edit</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
