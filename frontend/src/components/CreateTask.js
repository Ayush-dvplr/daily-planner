import React, { useState, useEffect } from "react";
import { connectWeb3, addTask } from "../contractFunctions";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { accounts, contract } = await connectWeb3();
        setAccount(accounts[0]);
        setContract(contract);
      } catch (error) {
        setError(error.message);
      }
    };
    init();
  }, []);

  const handleAddTask = async () => {
    try {
      console.log({ deadline });
      const timestamp = new Date(deadline).getTime() / 1000;
      console.log(timestamp);
      await addTask(contract, account, task, timestamp);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Create Task</h1>
      <input
        type="text"
        placeholder="Task Description"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div
        style={{ display: "flex", msFlexDirection: "row", marginTop: "1rem" }}
      >
        <p>Enter deadline: &nbsp; &nbsp; &nbsp;</p>
        <input
          type="datetime-local"
          placeholder="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default CreateTask;
