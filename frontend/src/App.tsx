import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {api} from "./api/client";
import ImportPage from "./pages/ImportPage";
import MissionControl from "./pages/MissionControl";
import EntityList from "./components/EntityList";
import TaskList from "./components/TaskList";

function App(){
  const [steward,setSteward]=useState<any>(null);
  const [entities,setEntities]=useState<any[]>([]);
  const [tasks,setTasks]=useState<any[]>([]);

  async function refresh(){
    setEntities(await api.entities());
    setTasks(await api.tasks());
    setSteward(await api.steward());
  }

  useEffect(()=>{ refresh().catch(()=>{}) }, []);

  return <main style={{fontFamily:"system-ui",padding:24,maxWidth:1100,margin:"0 auto"}}>
    <h1>NBOS Local Digital Twin v1.8</h1>
    <ImportPage onChanged={refresh}/>
    <MissionControl entities={entities} tasks={tasks} steward={steward}/>
    <EntityList entities={entities}/>
    <TaskList tasks={tasks}/>
  </main>
}

createRoot(document.getElementById("root")!).render(<App/>);
