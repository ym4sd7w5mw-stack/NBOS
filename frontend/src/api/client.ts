const API = "";

async function upload(path: string, file: File) {
  console.log("Uploading to:", `${API}${path}`, file.name);

  const form = new FormData();
  form.append("file", file);

  const response = await fetch(`${API}${path}`, {
    method: "POST",
    body: form,
  });

  console.log("Upload response:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error("Upload failed:", text);
    throw new Error(text);
  }

  return response.json();
}

export const api = {
  load: (payload: any) =>
    fetch(`${API}/runtime/load`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.json()),

  uploadFieldPackage: (file: File) =>
    upload("/runtime/upload/field-package-json", file),

  uploadGpsCsv: (file: File) =>
    upload("/runtime/upload/gps-csv", file),

  uploadPhotoLog: (file: File) =>
    upload("/runtime/upload/photo-log", file),

  entities: () => fetch(`${API}/runtime/entities`).then((r) => r.json()),
  tasks: () => fetch(`${API}/runtime/tasks`).then((r) => r.json()),
  steward: () => fetch(`${API}/runtime/steward`).then((r) => r.json()),
  snapshot: () => fetch(`${API}/runtime/snapshot`).then((r) => r.json()),
};