import { c } from '../theme';

export type Palette = readonly [string, string, string, string];
const dusk = [c.night,c.sun,'#606984','#414A63'] as const;
const dawn = [c.peach,'#F9EBCE','#DBA389','#BD8273'] as const;
const meadow = [c.sage,'#F7E6AF','#A7BEA9','#829F8A'] as const;
const mist = [c.lavender,'#FFF0DF','#B9B5D1','#938DAC'] as const;
const dunes = [c.sand,'#F6D6A9','#CBBDA8','#AB9B84'] as const;
const pose = (name:string, seconds:number, cue:string) => ({name,seconds,cue});
const seat = pose('Easy Seat',120,'Sit tall and let your shoulders soften.');
const child = pose('Child’s Pose',240,'Soften your shoulders and breathe into your back.');
const rest = pose('Savasana',180,'Release your weight into the mat.');
const lunge = pose('Low Lunge',240,'Let the front knee stack over your ankle.');
const fold = pose('Standing Fold',90,'Bend your knees and relax your neck.');
const twist = pose('Supine Twist',240,'Let your shoulders settle as you turn.');
const mountain = pose('Mountain Pose',60,'Root down evenly through both feet.');
export const sessions = [
  {id:'evening-unwind',title:'Evening Unwind',minutes:20,category:'Flow',level:'Beginner',intensity:'Gentle',
   art:dusk,tint:c.sage,icon:'moon',description:'Let the day settle with a slow, grounding flow. Ease through gentle stretches and finish with a moment of stillness.',
   poses:[seat,pose('Cat–Cow',180,'Move your spine with each breath.'),child,lunge,twist,rest]},
  {id:'morning-wake-up',title:'Morning wake-up',minutes:5,category:'Flow',level:'Beginner',intensity:'Gentle',
   art:dawn,tint:c.peach,icon:'sun',description:'Wake up your body with a short standing flow and a few easy stretches.',
   poses:[mountain,fold,pose('Downward Dog',90,'Press through your hands and lengthen your spine.'),mountain]},
  {id:'desk-stretch',title:'Desk stretch',minutes:10,category:'Yin',level:'Beginner',intensity:'Gentle',
   art:meadow,tint:c.sage,icon:'stretch',description:'Ease tension from a day at your desk with stretches for your sides, shoulders, and back.',
   poses:[seat,pose('Seated Side Stretch',180,'Reach up before leaning to the side.'),fold,{...child,seconds:210}]},
  {id:'breathwork',title:'Breathwork',minutes:8,category:'Breath',level:'Beginner',intensity:'Gentle',
   art:mist,tint:c.lavender,icon:'wind',description:'Find a steady rhythm with a quiet seated breathing practice.',
   poses:[seat,pose('Box Breathing',240,'Match the length of each breath and pause.'),{...rest,seconds:120}]},
  {id:'steady-strength',title:'Steady Strength',minutes:30,category:'Strength',level:'Intermediate',intensity:'Steady',
   art:dunes,tint:c.sand,icon:'stretch',description:'Build a steady base with standing postures, simple holds, and space to recover.',
   poses:[{...mountain,seconds:180},{...lunge,seconds:420},pose('Warrior II',420,'Reach evenly through both arms.'),pose('Plank',240,'Press the floor away and keep your hips level.'),{...child,seconds:300},{...rest,seconds:240}]},
  {id:'deep-rest',title:'Deep Rest',minutes:20,category:'Sleep',level:'Beginner',intensity:'Gentle',
   art:mist,tint:c.lavender,icon:'moon',description:'Slow down before sleep with quiet reclined shapes and plenty of time to settle.',
   poses:[child,pose('Reclined Butterfly',300,'Let your knees fall open without forcing.'),{...twist,seconds:300},{...rest,seconds:360}]},
] as const;
export type Session = (typeof sessions)[number];
export const featured = sessions[0];
export const getSession = (id?:string) => sessions.find(session => session.id === id) ?? featured;
export const time = (seconds:number) => Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2,'0');
export const quick = sessions.slice(1,4);
export const recent = [{session:sessions[2],date:'Today'},{session:sessions[0],date:'Yesterday'},{session:sessions[3],date:'Tuesday'}];
export const week = { days:['M','T','W','T','F','S','S'], minutes:[20,0,15,30,20,0,0], today:4, goal:120,
  streak:5, sessions:23, hours:'7.4h', done:[true,true,true,true,false,false,false] };
export const program = { title:'Foundations', day:4, total:14, session:featured };
