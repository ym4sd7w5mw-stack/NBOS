const API = "";

async function upload(path: string, file: File) {
  const form = new FormData();
  form.append("file", file);

  const response = await fetch(`${API}${path}`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

async function get(path: string) {
  const response = await fetch(`${API}${path}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

async function post(path: string, payload: any) {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export const api = {
  uploadFieldPackage: (file: File) => upload("/runtime/upload/field-package-json", file),
  uploadGpsCsv: (file: File) => upload("/runtime/upload/gps-csv", file),
  uploadPhotoLog: (file: File) => upload("/runtime/upload/photo-log", file),
  entities: () => get("/runtime/entities"),
  tasks: () => get("/runtime/tasks"),
  steward: () => get("/runtime/steward"),
  entityTypes: () => get("/runtime/entity-types"),
  createEntity: (payload: any) => post("/runtime/entities", payload),
};
