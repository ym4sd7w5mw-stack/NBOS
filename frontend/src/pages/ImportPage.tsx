import {api} from "../api/client";

export default function ImportPage({onChanged}:{onChanged:()=>void}) {
  async function uploadField(e:any) {
    const file = e.target.files?.[0];
    if (!file) return;
    await api.uploadFieldPackage(file);
    await onChanged();
  }

  async function uploadGps(e:any) {
    const file = e.target.files?.[0];
    if (!file) return;
    await api.uploadGpsCsv(file);
    await onChanged();
  }

  async function uploadPhoto(e:any) {
    const file = e.target.files?.[0];
    if (!file) return;
    await api.uploadPhotoLog(file);
    await onChanged();
  }

  return <section style={{border:"1px solid #ddd", padding:16, borderRadius:8}}>
    <h2>Import</h2>
    <label>Field package JSON <input type="file" accept=".json" onChange={uploadField}/></label><br/>
    <label>GPS CSV <input type="file" accept=".csv" onChange={uploadGps}/></label><br/>
    <label>Photo log CSV <input type="file" accept=".csv" onChange={uploadPhoto}/></label>
  </section>
}
