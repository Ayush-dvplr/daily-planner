// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DailyPlanner {

    struct Task {
        string task; //task desc
        uint deadline;
        bool isCompleted;
        bool deadlineUpdated; //ddmmyyyy
    }

    mapping(address => Task[]) private userTasks;

    event TaskAdded(address indexed user, uint taskIndex, string task, uint deadline);
    event TaskStatusUpdated(address indexed user, uint taskIndex, bool isCompleted);
    event TaskDeadlineUpdated(address indexed user, uint taskIndex, uint newDeadline);

    function addTask(string memory _task, uint _deadline) public {
        if (bytes(_task).length == 0) {
            revert("task description cannot be empty");
        }
        userTasks[msg.sender].push(Task({
            task: _task,
            deadline: _deadline,
            isCompleted: false,
            deadlineUpdated: false
        }));
        
        uint taskIndex = userTasks[msg.sender].length - 1;
        emit TaskAdded(msg.sender, taskIndex, _task, _deadline);
    }

    function updateTaskStatus(uint _taskIndex, bool _isCompleted) public {
        assert(_taskIndex < userTasks[msg.sender].length);

        userTasks[msg.sender][_taskIndex].isCompleted = _isCompleted;
        emit TaskStatusUpdated(msg.sender, _taskIndex, _isCompleted);
    }

    function updateTaskDeadline(uint _taskIndex, uint _newDeadline) public {
        require(_taskIndex < userTasks[msg.sender].length, "Task index out of bounds");
        require(!userTasks[msg.sender][_taskIndex].deadlineUpdated, "Deadline already updated once");

        userTasks[msg.sender][_taskIndex].deadline = _newDeadline;
        userTasks[msg.sender][_taskIndex].deadlineUpdated = true;
        
        emit TaskDeadlineUpdated(msg.sender, _taskIndex, _newDeadline);
    }

    function getTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}
