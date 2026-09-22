"use client";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";

const SERVICES=[{v:"moving",l:"Moving Help"},{v:"lifting",l:"Heavy Lifting"},{v:"assembly",l:"Furniture Assembly"},
  {v:"cleaning",l:"Cleaning"},{v:"junk",l:"Junk Removal"},{v:"van",l:"Van / Truck"},{v:"other",l:"Other"}];

export default function PostTaskModal({onClose,onPosted}:{onClose:()=>void;onPosted:()=>void}){
  const {user,token}=useAuth();
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState<string|null>(null);
  const [error,setError]=useState("");
  const [payType,setPayType]=useState("hourly");

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const data=Object.fromEntries(fd.entries()) as Record<string,string>;
    setLoading(true);setError("");
    const headers:Record<string,string>={"Content-Type":"application/json"};
    if(token) headers["Authorization"]=`Bearer ${token}`;
    try{
      const r=await fetch("/api/helpers/tasks/",{method:"POST",headers,body:JSON.stringify({
        title:data.title,service_type:data.service_type,description:data.description,
        location:data.location,date_needed:data.date_needed,duration_hrs:data.duration_hrs,
        pay_type:payType,rate_offered:data.rate_offered,helpers_needed:Number(data.helpers_needed||1),
        poster_name:data.poster_name||(user?.display_name||""),
        poster_email:data.poster_email||(user?.email||""),
        poster_phone:data.poster_phone||(user?.phone||""),
      })});
      const res=await r.json();
      if(res.ok){setDone(res.manage_url);onPosted();}else{setError(res.error||"Failed.");}
    }catch{setError("Network error, try again.");}
    setLoading(false);
  }

  return(
    <div className="nh-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="nh-modal nh-modal-wide">
        <button className="nh-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>
        {done?(
          <div className="nh-modal-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            <strong>Task is live!</strong>
            <p>Helpers can see your task. You&apos;ll get an email when someone applies.</p>
            <button className="btn btn-primary" style={{marginTop:"1.2rem"}} onClick={onClose}>Done</button>
          </div>
        ):(
          <>
            <h2 className="nh-modal-title">Post a task</h2>
            <p className="nh-modal-sub">Describe what you need. Approved helpers will see it immediately.</p>
            <form onSubmit={submit} noValidate>
              <div className="nh-form-grid">
                <div className="field nh-full">
                  <label htmlFor="pt-title">Task title *</label>
                  <input type="text" id="pt-title" name="title" placeholder="e.g. Need 2 movers for Mission apartment, Saturday" required/>
                </div>
                <div className="field"><label>Service type</label>
                  <select name="service_type">{SERVICES.map(s=><option key={s.v} value={s.v}>{s.l}</option>)}</select>
                </div>
                <div className="field"><label>Helpers needed</label>
                  <select name="helpers_needed">{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} helper{n>1?"s":""}</option>)}</select>
                </div>
                <div className="field"><label>Location *</label>
                  <input type="text" name="location" placeholder="e.g. Mission District, SF" required/></div>
                <div className="field"><label>Date / time *</label>
                  <input type="text" name="date_needed" placeholder="e.g. Sat Aug 23, morning" required/></div>
                <div className="field"><label>Duration (estimate)</label>
                  <input type="text" name="duration_hrs" placeholder="e.g. 3–4 hrs"/></div>
                <div className="field">
                  <label>Pay type</label>
                  <div className="pay-type-toggle">
                    <button type="button" className={payType==="hourly"?"is-active":""} onClick={()=>setPayType("hourly")}>Hourly</button>
                    <button type="button" className={payType==="fixed"?"is-active":""} onClick={()=>setPayType("fixed")}>Fixed price</button>
                  </div>
                </div>
                <div className="field"><label>Rate / price</label>
                  <input type="text" name="rate_offered" placeholder={payType==="hourly"?"e.g. $28/hr":"e.g. $120 flat"}/></div>
                <div className="field nh-full">
                  <label>Description *</label>
                  <textarea name="description" rows={4} placeholder="What needs to be done? Any stairs, heavy items, special requirements?" required/>
                </div>
                {!user&&(<>
                  <div className="field"><label>Your name *</label><input type="text" name="poster_name" required/></div>
                  <div className="field"><label>Your phone</label><input type="tel" name="poster_phone" placeholder="(415) 555-0100"/></div>
                  <div className="field nh-full"><label>Your email *</label><input type="email" name="poster_email" required/></div>
                </>)}
              </div>
              {error&&<p className="nh-error">{error}</p>}
              <p className="form-note" style={{marginTop:".5rem"}}>Your contact info is only shared with helpers who apply, not shown publicly.</p>
              <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",marginTop:"1rem"}} disabled={loading}>
                {loading?"Posting…":"Post task"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
