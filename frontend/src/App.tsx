import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { api } from "./api/client";
import ImportPage from "./pages/ImportPage";
import MissionControl from "./pages/MissionControl";
import EntityList from "./components/EntityList";
import TaskList from "./components/TaskList";
import MapPanel from "./components/MapPanel";
import EntityDetailPanel from "./components/EntityDetailPanel";

function App() {
  const [steward, setSteward] = useState<any>(null);
  const [entities, setEntities] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null);

  async function refresh() {
    const loadedEntities = await api.entities();
    setEntities(loadedEntities);
    setTasks(await api.tasks());
    setSteward(await api.steward());

    if (selectedEntity) {
      const updated = loadedEntities.find((entity: any) => entity.id === selectedEntity.id);
      setSelectedEntity(updated ?? null);
    }
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <h1>NBOS Local Digital Twin v2.1</h1>
      <ImportPage onChanged={refresh} />
      <MapPanel
        entities={entities}
        selectedEntityId={selectedEntity?.id ?? null}
        onSelectEntity={setSelectedEntity}
      />
      <EntityDetailPanel entity={selectedEntity} />
      <MissionControl entities={entities} tasks={tasks} steward={steward} />
      <EntityList entities={entities} />
      <TaskList tasks={tasks} />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);