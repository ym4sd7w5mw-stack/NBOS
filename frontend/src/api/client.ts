const API = "http://localhost:8000";

async function upload(path:string, file:File){
  const form = new FormData();
  form.append("file", file);
  return fetch(`${API}${path}`, {method:"POST", body:form}).then(r=>r.json());
}

export const api = {
  load: (payload:any) => fetch(`${API}/runtime/load`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}).then(r=>r.json()),
  uploadFieldPackage: (file:File) => upload("/runtime/upload/field-package-json", file),
  uploadGpsCsv: (file:File) => upload("/runtime/upload/gps-csv", file),
  uploadPhotoLog: (file:File) => upload("/runtime/upload/photo-log", file),
  entities: () => fetch(`${API}/runtime/entities`).then(r=>r.json()),
  tasks: () => fetch(`${API}/runtime/tasks`).then(r=>r.json()),
  steward: () => fetch(`${API}/runtime/steward`).then(r=>r.json()),
  snapshot: () => fetch(`${API}/runtime/snapshot`).then(r=>r.json())
};
