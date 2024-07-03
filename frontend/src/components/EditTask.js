import React, { useState, useEffect } from "react";
import {
  connectWeb3,
  updateTaskStatus,
  updateTaskDeadline,
  getTasks,
} from "../contractFunctions";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const EditTask = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { accounts, contract } = await connectWeb3();
        setAccount(accounts[0]);
        setContract(contract);
        const tasks = await getTasks(contract, accounts[0]);
        console.log(tasks);
        setTask(tasks[index]);
        setIsCompleted(tasks[index].isCompleted);
      } catch (error) {
        setError(error.message);
      }
    };
    init();
  }, [index]);

  const handleUpdateStatus = async () => {
    try {
      await updateTaskStatus(contract, account, index, true);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateDeadline = async () => {
    try {
      const timestamp = new Date(newDeadline).getTime() / 1000;
      await updateTaskDeadline(contract, account, index, timestamp);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container edit-task-container">
      {!isCompleted && (
        <button className="mark-complete-button" onClick={handleUpdateStatus}>
          Mark as Complete
        </button>
      )}
      <h1>Edit Task</h1>
      <p>Task: {task.task}</p>
      <p>
        Deadline:{" "}
        {new Date(task.deadline.toString() * 1000).toLocaleString("en-GB")}
      </p>
      <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
      <p>Update deadline :</p>
      <div style={{ display: "flex", width: "100%" }}>
        <input
          type="datetime-local"
          placeholder="New Deadline"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          required
        />
      </div>
      <button onClick={handleUpdateDeadline}>Update Deadline</button>
    </div>
  );
};

export default EditTask;
