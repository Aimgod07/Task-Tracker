import { useState } from "react";
import { searchTasks } from "../services/taskapi";

function SearchBar() {

    const [query, setQuery] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleSearch = async (e) => {

        const value = e.target.value;
        setQuery(value);

        try {
            const res = await searchTasks(value);
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search..."
            />

            {tasks.map(task => (
                <div key={task._id}>
                    {task.title}
                </div>
            ))}
        </>
    );
}
export default SearchBar;   