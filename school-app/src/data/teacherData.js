/* =====================================================
   TEACHER MOCK DATA
   ===================================================== */

export const teacher = {
  name: 'Ms. Patil',
  initials: 'SP',
  role: 'Class Teacher',
  designation: 'Senior Teacher',
  subject: 'Mathematics & Science',
  assignedClass: 'Std 8 Div A',
  employeeId: 'EMP-2041',
}

export const teacherTimetable = {
  Mon: [
    { id:1, period:'P1', subject:'Mathematics', classDiv:'Std 7 Div B', room:'Room 102', start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', classDiv:'Std 8 Div A', room:'Room 203', start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Mathematics', classDiv:'Std 9 Div A', room:'Room 301', start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'Free Period', classDiv:'—',           room:'Staff Room',start:'11:10', end:'12:00', status:'upcoming' },
  ],
  Tue: [
    { id:1, period:'P1', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', classDiv:'Std 9 Div A', room:'Room 301', start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'Mathematics', classDiv:'Std 7 Div B', room:'Room 102', start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'10:20', end:'11:10', status:'upcoming' },
  ],
  Wed: [
    { id:1, period:'P1', subject:'Mathematics', classDiv:'Std 8 Div A', room:'Room 203', start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', classDiv:'Std 7 Div B', room:'Room 102', start:'08:20', end:'09:10', status:'done' },
    { id:'b1', break:true, label:'Break', time:'09:10 – 09:30' },
    { id:3, period:'P3', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'09:30', end:'10:20', status:'done' },
    { id:4, period:'P4', subject:'Mathematics', classDiv:'Std 9 Div A', room:'Room 301', start:'10:20', end:'11:10', status:'upcoming' },
  ],
  Thu: [
    { id:1, period:'P1', subject:'Mathematics', classDiv:'Std 9 Div A', room:'Room 301', start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'Mathematics', classDiv:'Std 8 Div A', room:'Room 203', start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Free Period', classDiv:'—',           room:'Staff Room',start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'Mathematics', classDiv:'Std 7 Div B', room:'Room 102', start:'11:10', end:'12:00', status:'upcoming' },
  ],
  Fri: [
    { id:1, period:'P1', subject:'Mathematics', classDiv:'Std 8 Div A', room:'Room 203', start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', classDiv:'Std 7 Div B', room:'Room 102', start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Mathematics', classDiv:'Std 9 Div A', room:'Room 301', start:'10:20', end:'11:10', status:'upcoming' },
  ],
  Sat: [
    { id:1, period:'P1', subject:'Science',     classDiv:'Std 8 Div A', room:'Lab 1',    start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', classDiv:'Std 7 Div B', room:'Room 102', start:'08:20', end:'09:10', status:'done' },
  ],
}

/* Attendance — students of Std 8 Div A */
export const classStudents = [
  { id:1,  rollNo:1,  name:'Aditya Bhosale',  initials:'AB' },
  { id:2,  rollNo:2,  name:'Ananya Chavan',   initials:'AC' },
  { id:3,  rollNo:3,  name:'Arjun Deshmukh',  initials:'AD' },
  { id:4,  rollNo:4,  name:'Bhavika Gore',    initials:'BG' },
  { id:5,  rollNo:5,  name:'Chinmay Joshi',   initials:'CJ' },
  { id:6,  rollNo:6,  name:'Deepa Kamble',    initials:'DK' },
  { id:7,  rollNo:7,  name:'Gaurav Kulkarni', initials:'GK' },
  { id:8,  rollNo:8,  name:'Harshada Mane',   initials:'HM' },
  { id:9,  rollNo:9,  name:'Ishaan Naik',     initials:'IN' },
  { id:10, rollNo:10, name:'Janhavi Patil',   initials:'JP' },
  { id:11, rollNo:11, name:'Kiran Salunkhe',  initials:'KS' },
  { id:12, rollNo:12, name:'Lakshmi Shah',    initials:'LS' },
  { id:13, rollNo:13, name:'Mandar Tiwari',   initials:'MT' },
  { id:14, rollNo:14, name:'Aarav Sharma',    initials:'AS' },
  { id:15, rollNo:15, name:'Neha Wagh',       initials:'NW' },
  { id:16, rollNo:16, name:'Om Yadav',        initials:'OY' },
  { id:17, rollNo:17, name:'Priya Zope',      initials:'PZ' },
  { id:18, rollNo:18, name:'Raj Ahire',       initials:'RA' },
  { id:19, rollNo:19, name:'Saisha Bane',     initials:'SB' },
  { id:20, rollNo:20, name:'Tanmay Chaudhari',initials:'TC' },
]

/* Teacher–assigned homework (outgoing view) */
export const teacherHomework = [
  {
    id:'thw1', subject:'Mathematics', classDiv:'Std 7 Div B',
    title:'Chapter 5 Exercise 5.3 – Fractions',
    due:'Today, 10 Apr', submitted:12, total:38, status:'open',
  },
  {
    id:'thw2', subject:'Science', classDiv:'Std 8 Div A',
    title:'Diagram: Digestive System + Labels',
    due:'Tomorrow, 11 Apr', submitted:28, total:41, status:'open',
  },
  {
    id:'thw3', subject:'Mathematics', classDiv:'Std 9 Div A',
    title:'Chapter 3 Exercise 3.2 – Polynomials',
    due:'12 Apr', submitted:5, total:39, status:'open',
  },
  {
    id:'thw4', subject:'Mathematics', classDiv:'Std 8 Div A',
    title:'Chapter 4 Exercise 4.1 & 4.2',
    due:'5 Apr', submitted:41, total:41, status:'closed',
  },
  {
    id:'thw5', subject:'Science', classDiv:'Std 8 Div A',
    title:'Lab Report – Water Cycle Experiment',
    due:'1 Apr', submitted:39, total:41, status:'closed',
  },
]

/* Inbox for teacher */
export const teacherInboxItems = [
  {
    id:'tn1', type:'admin', title:'Staff Meeting – Saturday 12 Apr', unread:true,
    preview:'All staff are requested to attend a mandatory meeting on Saturday at 10:00 AM in the conference room...',
    sender:'Principal', time:'Today',
    icon:'🏫', iconBg:'#e8eff8', iconColor:'#1d3d6b',
  },
  {
    id:'tn2', type:'admin', title:'Unit Test 3 – Question Paper Deadline', unread:true,
    preview:'Please submit your Unit Test 3 question paper by 14 April, 5:00 PM to the exam coordinator...',
    sender:'Exam Coordinator', time:'Yesterday',
    icon:'📝', iconBg:'#ede9fe', iconColor:'#7c3aed',
  },
  {
    id:'tn3', type:'parent', title:'Parent Query – Aarav Sharma', unread:false,
    preview:"Aarav's parent has asked about his performance in Mathematics Unit Test 2. Please respond when available...",
    sender:'Mrs. Meena Sharma (Parent)', time:'2 days ago',
    icon:'👪', iconBg:'#ccfbf1', iconColor:'#0a9396',
  },
  {
    id:'tn4', type:'admin', title:'Leave Application – Approved', unread:false,
    preview:'Your leave application for 8 April 2026 has been approved by the Principal. Enjoy your day off!',
    sender:'Admin Office', time:'3 days ago',
    icon:'✅', iconBg:'#dcfce7', iconColor:'#16a34a',
  },
  {
    id:'tn5', type:'admin', title:'Annual Day Preparation – Committee', unread:false,
    preview:'You have been assigned to the cultural committee for Annual Day. First meeting on 15 Apr at 11:00 AM...',
    sender:'Principal', time:'5 days ago',
    icon:'🎭', iconBg:'#fef3c7', iconColor:'#d97706',
  },
  {
    id:'tn6', type:'parent', title:'Parent Query – Harshada Mane', unread:false,
    preview:"Harshada's parent has requested a meeting to discuss her attendance pattern this term...",
    sender:'Mr. Suresh Mane (Parent)', time:'1 week ago',
    icon:'👨‍👧', iconBg:'#ffedd5', iconColor:'#ea580c',
  },
]
