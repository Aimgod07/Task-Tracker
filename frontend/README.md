# TaskFlow — My Tasks UI

A React + Vite recreation of the "My Tasks" task management interface (sidebar nav, task list with Today/Upcoming groups, status pills, and a task detail side panel).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Project structure

```
src/
  data/tasks.js          mock tasks, projects, and current user
  components/
    Sidebar.jsx           left navigation, project list, user footer
    TopBar.jsx             page title, search, notification/settings icons
    Tabs.jsx                All / To Do / In Progress / Review / Done filter tabs
    TaskList.jsx           Today + Upcoming task groups
    TaskRow.jsx            single task list item
    TaskDetail.jsx        right-hand task detail panel
  App.jsx                 layout composition + selection state
  index.css               all styling (CSS variables based design tokens)
```

## Notes

- Clicking a task row opens/updates the detail panel on the right (click the X to close it).
- Tabs are wired up visually; filtering by tab isn't implemented, but `activeTab` state is available in `App.jsx` if you want to filter `tasks.today` / `tasks.upcoming` by status.
- Avatars are pulled from `pravatar.cc` placeholder URLs — swap in real user photos in `src/data/tasks.js`.
- All colors, radii, and spacing are defined as CSS custom properties at the top of `src/index.css` for easy retheming.
- Uses [lucide-react](https://lucide.dev/) for icons.
