// Mock data modeled on the "My Tasks" screen

export const projects = [
  { id: "website-redesign", name: "Website Redesign", color: "#6D5FFD" },
  { id: "mobile-app", name: "Mobile App", color: "#2FB6C4" },
  { id: "marketing-campaign", name: "Marketing Campaign", color: "#F163A0" },
  { id: "product-launch", name: "Product Launch", color: "#F5A524" },
  { id: "client-portal", name: "Client Portal", color: "#3FBF6A" },
];

const avatar = (seed) => `https://i.pravatar.cc/64?img=${seed}`;

export const tasks = {
  today: [
    {
      id: "t1",
      title: "Design homepage hero section",
      project: "Website Redesign",
      projectColor: "#6D5FFD",
      assignee: avatar(47),
      due: "May 24",
      status: "In Progress",
      done: false,
    },
    {
      id: "t2",
      title: "Review user feedback",
      project: "Mobile App",
      projectColor: "#2FB6C4",
      assignee: avatar(12),
      due: "May 24",
      status: "Review",
      done: false,
    },
    {
      id: "t3",
      title: "Update task management UI",
      project: "Website Redesign",
      projectColor: "#6D5FFD",
      assignee: avatar(33),
      due: "May 24",
      status: "Done",
      done: true,
    },
    {
      id: "t4",
      title: "Prepare design system guidelines",
      project: "Mobile App",
      projectColor: "#2FB6C4",
      assignee: avatar(21),
      due: "May 24",
      status: "In Progress",
      done: false,
    },
  ],
  upcoming: [
    {
      id: "t5",
      title: "User research analysis",
      project: "Marketing Campaign",
      projectColor: "#F163A0",
      assignee: avatar(48),
      due: "May 25",
      status: "To Do",
      done: false,
    },
    {
      id: "t6",
      title: "Create wireframes",
      project: "Website Redesign",
      projectColor: "#6D5FFD",
      assignee: avatar(14),
      due: "May 26",
      status: "To Do",
      done: false,
    },
    {
      id: "t7",
      title: "Set up analytics dashboard",
      project: "Client Portal",
      projectColor: "#3FBF6A",
      assignee: avatar(31),
      due: "May 27",
      status: "To Do",
      done: false,
    },
    {
      id: "t8",
      title: "Conduct usability testing",
      project: "Mobile App",
      projectColor: "#2FB6C4",
      assignee: avatar(23),
      due: "May 28",
      status: "To Do",
      done: false,
    },
    {
      id: "t9",
      title: "Finalize brand assets",
      project: "Product Launch",
      projectColor: "#F5A524",
      assignee: avatar(45),
      due: "May 29",
      status: "To Do",
      done: false,
    },
  ],
};

export const taskDetail = {
  id: "t1",
  title: "Design homepage hero section",
  project: "Website Redesign",
  projectColor: "#6D5FFD",
  assignee: { name: "Olivia Rhye", avatar: avatar(47) },
  dueDate: "May 24, 2024",
  priority: "High",
  status: "In Progress",
  description:
    "Create a modern, engaging hero section for the homepage that communicates our value proposition clearly and drives user engagement.",
  subtasks: [
    { id: "s1", label: "Create initial wireframes", done: true },
    { id: "s2", label: "Design desktop layout", done: true },
    { id: "s3", label: "Design mobile layout", done: false },
    { id: "s4", label: "Review and iterate", done: false },
  ],
  attachments: [
    { id: "a1", name: "hero-bg.jpg", type: "image" },
    { id: "a2", name: "wireframe.pdf", type: "pdf" },
    { id: "a3", name: "design.sketch", type: "sketch" },
  ],
};

export const currentUser = {
  name: "Olivia Rhye",
  email: "olivia@taskflow.com",
  avatar: avatar(47),
};
