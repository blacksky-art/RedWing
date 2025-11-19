import { useState } from "react";
import API from "../api";

export default function ChecklistItem({ item, flightId }) {
  const [status, setStatus] = useState(item.status);
  const [comments, setComments] = useState(item.comments || "");

  const updateChecklist = async () => {
    await API.patch(`/${flightId}/checklist/${item._id}`, {
      status,
      comments,
    });
    alert("Checklist updated!");
  };



  return (
    <div style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
      <p><b>{item.checkName}</b></p>

      <label>Status: </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">pending</option>
        <option value="completed">completed</option>
      </select>

      <br /><br />

      <textarea
        placeholder="Comments..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <br />
      <button onClick={updateChecklist}>Update</button>
    </div>
  );
}

