import { useState } from "react";
import { sortTasks } from "../services/taskApi";

function SortDropdown() {

    const [tasks, setTasks] = useState([]);

    const handleSort = async (e) => {

        const value = e.target.value;

        const [sortBy, order] = value.split("-");

        const res = await sortTasks(sortBy, order);

        setTasks(res.data);
    };

    return (
        <>
            <select onChange={handleSort}>
                <option value="">Sort</option>

                <option value="title-asc">
                    Title A-Z
                </option>

                <option value="title-desc">
                    Title Z-A
                </option>

                <option value="dueDate-asc">
                    Due Date ↑
                </option>

                <option value="dueDate-desc">
                    Due Date ↓
                </option>
            </select>

            {tasks.map(task => (
                <div key={task._id}>
                    {task.title}
                </div>
            ))}
        </>
    );
}

export default SortDropdown;