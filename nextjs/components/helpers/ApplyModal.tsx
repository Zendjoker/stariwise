"use client";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import type { Task } from "./TaskBoard";

export default function ApplyModal({task,onClose}:{task:Task;onClose:()=>void}){
  const {user,token}=useAuth();
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");

  async function submit(e:React.FormEvent){
    e.preventDefault();setLoading(true);setError("");
    const headers:Record<string,string>={"Content-Type":"application/json"};
    if(token) headers["Authorization"]=`Bearer ${token}`;
    try{
      const r=await fetch(`/api/helpers/tasks/${task.id}/apply/`,{method:"POST",headers,body:JSON.stringify({
        worker_name:user?.display_name||"",worker_phone:user?.phone||"",
        worker_email:user?.email||"",message,
      })});
      const d=await r.json();
      if(d.ok){setDone(true);}else{setError(d.error||"Failed.");}
    }catch{setError("Network error.");}
    setLoading(false);
  }

  return(
    <div className="nh-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="nh-modal">
        <button className="nh-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>
        {done?(
          <div className="nh-modal-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            <strong>Application sent!</strong>
            <p>The poster has been notified with your contact info. They will reach out directly.</p>
            <button className="btn btn-primary" style={{marginTop:"1.2rem"}} onClick={onClose}>Done</button>
          </div>
        ):(
          <>
            <div className="nh-apply-task-preview">
              <p className="eyebrow" style={{marginBottom:".3rem"}}>Applying to</p>
              <strong>{task.title}</strong>
              <p style={{fontSize:".88rem",opacity:.7,marginTop:".2rem"}}>{task.location} · {task.date_needed}</p>
            </div>
            <h2 className="nh-modal-title">Confirm your application</h2>
            <p className="nh-modal-sub">Your name and phone will be sent to the task poster.</p>
            {user&&(
              <div className="apply-profile-row">
                <div style={{width:48,height:48,borderRadius:"50%",overflow:"hidden",background:"var(--deep-green)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:18,flexShrink:0}}>
                  {user.profile_picture?<img src={user.profile_picture} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:user.display_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong style={{display:"block"}}>{user.display_name}</strong>
                  <span style={{fontSize:".85rem",opacity:.7}}>{user.phone||"No phone on file"} · {user.location||"SF"}</span>
                </div>
              </div>
            )}
            <form onSubmit={submit} noValidate>
              <div className="field" style={{marginTop:"1rem"}}>
                <label htmlFor="ap-msg">Short message (optional)</label>
                <textarea id="ap-msg" rows={3} value={message} onChange={e=>setMessage(e.target.value)}
                  placeholder="e.g. I have 5 years moving experience, own a cargo van, available all day."/>
              </div>
              {error&&<p className="nh-error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",marginTop:"1rem"}} disabled={loading}>
                {loading?"Sending…":"Send application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
