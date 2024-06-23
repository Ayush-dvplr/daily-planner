// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const DailyPlanner = await hre.ethers.getContractFactory("DailyPlanner");
  const dailyPlanner = await DailyPlanner.deploy();

  await dailyPlanner.deployed();

  dailyPlanner.on("TaskAdded", (user, taskIndex, task, deadline) => {
    console.log(
      `Task added by ${user}: [Task Index: ${taskIndex}, Task: ${task}, Deadline: ${deadline}]`
    );
  });

  dailyPlanner.on("TaskStatusUpdated", (user, taskIndex, isCompleted) => {
    console.log(
      `Task status updated by ${user}: [Task Index: ${taskIndex}, Is Completed: ${isCompleted}]`
    );
  });

  dailyPlanner.on("TaskDeadlineUpdated", (user, taskIndex, newDeadline) => {
    console.log(
      `Task deadline updated by ${user}: [Task Index: ${taskIndex}, New Deadline: ${newDeadline}]`
    );
  });

  console.log(`Contract deployed to ${dailyPlanner.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
