import React from "react";
import { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Tabs from "../components/Tabs";
import TaskList from "../components/TaskList";
import TaskDetail from "../components/TaskDetail";
import { getTasks } from "../services/taskapi";
import Login from "../pages/Login";
import { Link } from "react-router-dom";
import Register from "../pages/Register";

import Task from "../components/Task";
import { useAuth } from '../../context/AuthContext';


const Home = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [showDetail, setShowDetail] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);



  const { checkAuth } = useAuth();
 useEffect(()=>{
  const isAuth=checkAuth();
  if(!isAuth) return;
 },[]);
 



  // Handlers
  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    setSelectedTask(null);
    fetchTasks();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setShowDetail(true);
  };

  return (
    <>
      <Sidebar onTaskCreated={() => setRefreshTrigger((n) => n + 1)} />
      <div className="main-content">
        <TopBar />
        <Tabs active={activeTab} onChange={setActiveTab} />
        
        <TaskList
          selectedTask={selectedTask}
          onSelectTask={setSelectedTask}
          tasks={tasks}
          refreshTrigger={refreshTrigger}
        />
      </div>

      {showDetail && (
        <TaskDetail onClose={() => setShowDetail(false)} task={selectedTask} />
      )}
    </>
  );
}

export default Home;
