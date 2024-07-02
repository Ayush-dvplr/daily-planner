import Web3 from "web3";
import DailyPlanner from "./DailyPlanner.json";

// NOTE:
// if http://localhost:8545 not working then try this http://127.0.0.1:8545/

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function connectWeb3() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(DailyPlanner.abi, contractAddress);
  const accounts = await web3.eth.getAccounts();
  console.log(instance, accounts);
  return { accounts, contract: instance };
}

// Add a new task
async function addTask(contractInstance, account, task, deadline) {
  const res = await contractInstance.methods
    .addTask(task, deadline)
    .send({ from: account });
  console.log("Res:", res);
  const taskAddedEvent = res.events.TaskAdded.returnValues;
  return taskAddedEvent;
}

// Update task status
async function updateTaskStatus(
  contractInstance,
  account,
  taskIndex,
  isCompleted
) {
  const res = await contractInstance.methods
    .updateTaskStatus(taskIndex, isCompleted)
    .send({ from: account });
  console.log("Res:", res);
  const taskStatusUpdatedEvent = res.events.TaskStatusUpdated.returnValues;
  return taskStatusUpdatedEvent;
}

// Update task deadline
async function updateTaskDeadline(
  contractInstance,
  account,
  taskIndex,
  newDeadline
) {
  const res = await contractInstance.methods
    .updateTaskDeadline(taskIndex, newDeadline)
    .send({ from: account });
  console.log("Res:", res);
  const taskDeadlineUpdatedEvent = res.events.TaskDeadlineUpdated.returnValues;
  return taskDeadlineUpdatedEvent;
}

// Get tasks
async function getTasks(contractInstance, account) {
  const tasks = await contractInstance.methods
    .getTasks()
    .call({ from: account });
  return tasks;
}

export { connectWeb3, addTask, updateTaskStatus, updateTaskDeadline, getTasks };
