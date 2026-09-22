"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/useAuth";
import AuthModal from "./AuthModal";
import HelperOnboarding from "./HelperOnboarding";
import PostTaskModal from "./PostTaskModal";
import ApplyModal from "./ApplyModal";
import ProfilePanel from "./ProfilePanel";

const FILTERS = [
  { key: "all", label: "All" }, { key: "moving", label: "🚛 Moving" },
  { key: "lifting", label: "🏋️ Lifting" }, { key: "assembly", label: "🔧 Assembly" },
  { key: "cleaning", label: "🧹 Cleaning" }, { key: "junk", label: "🗑️ Junk" },
  { key: "van", label: "🚐 Van" }, { key: "other", label: "Other" },
];
const COLOR: Record<string, string> = {
  moving:"#2563EB",lifting:"#DC2626",assembly:"#7C3AED",
  cleaning:"#0891B2",junk:"#92400E",van:"#065F46",other:"#6B7280",
};

export interface Task {
  id:number;title:string;service_type:string;service_label:string;
  description:string;location:string;date_needed:string;
  duration_hrs:string;pay_type:string;rate_offered:string;
  helpers_needed:number;poster_name:string;poster_pic:string|null;
  status:string;created_at:string;application_count:number;
}

export function Avatar({ name, pic, size=40 }:{name:string;pic?:string|null;size?:number}) {
  const s = {width:size,height:size,borderRadius:"50%",overflow:"hidden" as const,
    background:"var(--deep-green)",display:"inline-flex" as const,alignItems:"center" as const,
    justifyContent:"center" as const,fontWeight:700,color:"#fff",fontSize:size*.38,flexShrink:0 as const};
  return <div style={s}>{pic
    ? <img src={pic} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
    : name.charAt(0).toUpperCase()}</div>;
}

function timeAgo(iso:string){
  const h=Math.floor((Date.now()-new Date(iso).getTime())/3600000);
  if(h<1)return"just now";if(h<24)return`${h}h ago`;return`${Math.floor(h/24)}d ago`;
}

function TaskCard({task,onApply}:{task:Task;onApply:()=>void}){
  const color=COLOR[task.service_type]||"#6B7280";
  const payLabel=task.rate_offered?(task.pay_type==="fixed"?`Flat ${task.rate_offered}`:`${task.rate_offered}/hr`):null;
  return(
    <article className="tc">
      <div className="tc-top">
        <span className="tc-badge" style={{background:color+"18",color}}>{task.service_label}</span>
        <span className="tc-time">{timeAgo(task.created_at)}</span>
      </div>
      <h3 className="tc-title">{task.title}</h3>
      <p className="tc-desc">{task.description.slice(0,140)}{task.description.length>140?"…":""}</p>
      <ul className="tc-meta">
        <li><span>📍</span>{task.location}</li>
        <li><span>📅</span>{task.date_needed}{task.duration_hrs?` · ${task.duration_hrs}`:""}</li>
        {payLabel&&<li><span>💰</span>{payLabel}</li>}
        <li><span>👥</span>{task.helpers_needed} needed</li>
      </ul>
      <div className="tc-footer">
        <div className="tc-poster"><Avatar name={task.poster_name} pic={task.poster_pic} size={32}/><span>{task.poster_name}</span></div>
        <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
          {task.application_count>0&&<span className="tc-apps">{task.application_count} applied</span>}
          <button className="btn btn-primary tc-btn" onClick={onApply}>I can help</button>
        </div>
      </div>
    </article>
  );
}

export default function TaskBoard(){
  const {user}=useAuth();
  const [tasks,setTasks]=useState<Task[]>([]);
  const [filter,setFilter]=useState("all");
  const [fetching,setFetching]=useState(true);
  const [showAuth,setShowAuth]=useState(false);
  const [authMode,setAuthMode]=useState<"login"|"register">("register");
  const [showOnboard,setShowOnboard]=useState(false);
  const [showPost,setShowPost]=useState(false);
  const [applyTask,setApplyTask]=useState<Task|null>(null);
  const [showProfile,setShowProfile]=useState(false);

  const load=useCallback(async(svc="all")=>{
    setFetching(true);
    const p=svc!=="all"?`?service=${svc}`:"";
    const r=await fetch(`/api/helpers/tasks/${p}`).catch(()=>null);
    const d=r?await r.json().catch(()=>({})):{};
    setTasks(d.tasks||[]);setFetching(false);
  },[]);

  useEffect(()=>{load(filter);},[filter,load]);

  const handleApply=(task:Task)=>{
    if(!user){setAuthMode("register");setShowAuth(true);return;}
    if(user.helper_status==="none"||user.helper_status==="rejected"){setShowOnboard(true);return;}
    if(user.helper_status==="pending"){alert("Your helper application is under review. You'll be notified once approved.");return;}
    setApplyTask(task);
  };
  const handlePost=()=>{if(!user){setAuthMode("register");setShowAuth(true);return;}setShowPost(true);};

  return(
    <>
      <div className="nh-hero">
        <div className="wrap nh-hero-inner">
          <div className="nh-hero-copy">
            <p className="eyebrow">SF helper network · by Stairwise</p>
            <h1 className="nh-heading">Need extra hands?<br/>Find a helper today.</h1>
            <p className="nh-sub">Post a moving, assembly, cleaning, or lifting task and connect with skilled SF helpers. Most are available same-day.</p>
            <div className="nh-ctas">
              <button className="btn btn-primary btn-lg" onClick={handlePost}>+ Post a task</button>
              {!user?(
                <button className="btn nh-btn-ghost" onClick={()=>{setAuthMode("register");setShowAuth(true);}}>Join as a helper →</button>
              ):user.helper_status==="approved"?(
                <button className="btn nh-btn-ghost" onClick={()=>setShowProfile(true)}>
                  <Avatar name={user.display_name} pic={user.profile_picture} size={26}/>{user.display_name}
                </button>
              ):user.helper_status==="pending"?(
                <span className="nh-pending-badge">⏳ Application under review</span>
              ):(
                <button className="btn nh-btn-ghost" onClick={()=>setShowOnboard(true)}>Apply as helper →</button>
              )}
            </div>
          </div>
          <div className="nh-hero-stats">
            {[{n:"3-step",l:"Post, get matched, done"},{n:"SF Only",l:"Helpers near you"},{n:"Free",l:"No booking fees"}].map(({n,l})=>(
              <div key={n} className="nh-stat"><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="nh-how-strip">
        <div className="wrap nh-how-inner">
          {[
            {n:"1",t:"Post your task",b:"Describe what you need, when, where. 30 seconds."},
            {n:"2",t:"Helpers apply",b:"Verified SF helpers see your task and express interest."},
            {n:"3",t:"Connect directly",b:"You get their contact. No fees. No middleman."},
          ].map(({n,t,b})=>(
            <div key={n} className="nh-how-step">
              <div className="nh-how-num">{n}</div><strong>{t}</strong><p>{b}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="nh-board-wrap">
        <div className="wrap">
          <div className="nh-board-top">
            <div>
              <h2 className="nh-board-title">Open tasks</h2>
              <p className="nh-board-sub">Verified helpers can apply. Sign up or log in to post or apply.</p>
            </div>
            <button className="btn btn-primary" onClick={handlePost}>+ Post a task</button>
          </div>
          <div className="nh-filters" role="tablist">
            {FILTERS.map(({key,label})=>(
              <button key={key} role="tab" aria-selected={filter===key}
                className={`nh-filter${filter===key?" is-active":""}`} onClick={()=>setFilter(key)}>{label}</button>
            ))}
          </div>
          {fetching?(
            <div className="nh-empty">Loading…</div>
          ):tasks.length===0?(
            <div className="nh-empty">
              <div style={{fontSize:"2.5rem",marginBottom:".8rem"}}>🔍</div>
              <strong>No open tasks right now</strong>
              <p>Be the first: post yours and helpers will see it immediately.</p>
              <button className="btn btn-primary btn-lg" style={{marginTop:"1.2rem"}} onClick={handlePost}>Post a task</button>
            </div>
          ):(
            <div className="tc-grid">
              {tasks.map(t=><TaskCard key={t.id} task={t} onApply={()=>handleApply(t)}/>)}
            </div>
          )}
        </div>
      </div>

      {showAuth&&<AuthModal mode={authMode} onClose={()=>setShowAuth(false)} onSwitch={m=>setAuthMode(m)} onDone={()=>setShowAuth(false)}/>}
      {showOnboard&&<HelperOnboarding onClose={()=>setShowOnboard(false)} onDone={()=>setShowOnboard(false)}/>}
      {showPost&&<PostTaskModal onClose={()=>setShowPost(false)} onPosted={()=>{setShowPost(false);load(filter);}}/>}
      {applyTask&&<ApplyModal task={applyTask} onClose={()=>setApplyTask(null)}/>}
      {showProfile&&user&&<ProfilePanel onClose={()=>setShowProfile(false)} onUpdated={()=>{}}/>}
    </>
  );
}
