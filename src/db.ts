import Dexie, { type Table } from 'dexie';
export type HabitType = 'binary'|'number';
export type Habit = {id:string;name:string;emoji:string;color:string;type:HabitType;target:number;unit:string;days:number[];created:string;archived:boolean;description:string};
export type Log = {id:string;habitId:string;date:string;value:number;note:string};
class HabitDatabase extends Dexie {habits!:Table<Habit,string>;logs!:Table<Log,string>;constructor(){super('HabitFlowDB');this.version(1).stores({habits:'id,archived,created',logs:'id,habitId,date,[habitId+date]'})}}
export const db = new HabitDatabase();
export const dayKey=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const parseDay=(s:string)=>new Date(`${s}T12:00:00`);
export const scheduled=(h:Habit,date:string)=>date>=h.created && h.days.includes(parseDay(date).getDay());
export const progress=(h:Habit,l?:Log)=>Math.min(1,Math.max(0,(l?.value||0)/(h.type==='binary'?1:h.target)));
export const complete=(h:Habit,l?:Log)=>progress(h,l)>=1;
export function streak(h:Habit,logs:Log[],today:string){const map=new Map(logs.filter(l=>l.habitId===h.id).map(l=>[l.date,l]));let current=0,longest=0,run=0;const start=parseDay(h.created),end=parseDay(today);for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){const k=dayKey(d);if(!scheduled(h,k))continue;if(complete(h,map.get(k)))run++;else{longest=Math.max(longest,run);run=0}}longest=Math.max(longest,run);let d=parseDay(today);if(scheduled(h,today)&&!complete(h,map.get(today)))d.setDate(d.getDate()-1);while(d>=start){const k=dayKey(d);if(scheduled(h,k)){if(complete(h,map.get(k)))current++;else break}d.setDate(d.getDate()-1)}return {current,longest}}
