/* =====================================================
   STUDENT MOCK DATA
   ===================================================== */

export const student = {
  name: 'Aarav Sharma',
  initials: 'AS',
  standard: 'Std 8',
  division: 'Div A',
  rollNo: 14,
  tagline: 'Keep up the excellent work today!',
}

export const timetable = {
  Mon: [
    { id:1, period:'P1', subject:'Mathematics', teacher:'Mr. Deshmukh', room:'Room 203', start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Science',     teacher:'Ms. Kulkarni',  room:'Lab 1',   start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'English',     teacher:'Ms. Fernandes', room:'Room 201',start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Marathi',     teacher:'Mr. Jadhav',    room:'Room 205',start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'History',     teacher:'Ms. Pawar',     room:'Room 202',start:'11:10', end:'12:00', status:'upcoming' },
    { id:6, period:'P6', subject:'Geography',   teacher:'Ms. Shah',      room:'Room 204',start:'12:00', end:'12:50', status:'upcoming' },
  ],
  Tue: [
    { id:1, period:'P1', subject:'Science',     teacher:'Ms. Kulkarni',  room:'Lab 1',   start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', teacher:'Mr. Deshmukh',  room:'Room 203',start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'Marathi',     teacher:'Mr. Jadhav',    room:'Room 205',start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'English',     teacher:'Ms. Fernandes', room:'Room 201',start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'Geography',   teacher:'Ms. Shah',      room:'Room 204',start:'11:10', end:'12:00', status:'upcoming' },
  ],
  Wed: [
    { id:1, period:'P1', subject:'English',     teacher:'Ms. Fernandes', room:'Room 201',start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'History',     teacher:'Ms. Pawar',     room:'Room 202',start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'Mathematics', teacher:'Mr. Deshmukh',  room:'Room 203',start:'09:10', end:'10:00', status:'done' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Science',     teacher:'Ms. Kulkarni',  room:'Lab 1',   start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'Marathi',     teacher:'Mr. Jadhav',    room:'Room 205',start:'11:10', end:'12:00', status:'upcoming' },
  ],
  Thu: [
    { id:1, period:'P1', subject:'Geography',   teacher:'Ms. Shah',      room:'Room 204',start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Marathi',     teacher:'Mr. Jadhav',    room:'Room 205',start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'History',     teacher:'Ms. Pawar',     room:'Room 202',start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Mathematics', teacher:'Mr. Deshmukh',  room:'Room 203',start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'English',     teacher:'Ms. Fernandes', room:'Room 201',start:'11:10', end:'12:00', status:'upcoming' },
  ],
  Fri: [
    { id:1, period:'P1', subject:'Mathematics', teacher:'Mr. Deshmukh',  room:'Room 203',start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Science',     teacher:'Ms. Kulkarni',  room:'Lab 1',   start:'08:20', end:'09:10', status:'done' },
    { id:3, period:'P3', subject:'English',     teacher:'Ms. Fernandes', room:'Room 201',start:'09:10', end:'10:00', status:'in-progress' },
    { id:'b1', break:true, label:'Break', time:'10:00 – 10:20' },
    { id:4, period:'P4', subject:'Marathi',     teacher:'Mr. Jadhav',    room:'Room 205',start:'10:20', end:'11:10', status:'upcoming' },
    { id:5, period:'P5', subject:'History',     teacher:'Ms. Pawar',     room:'Room 202',start:'11:10', end:'12:00', status:'upcoming' },
    { id:6, period:'P6', subject:'Geography',   teacher:'Ms. Shah',      room:'Room 204',start:'12:00', end:'12:50', status:'upcoming' },
  ],
  Sat: [
    { id:1, period:'P1', subject:'Science',     teacher:'Ms. Kulkarni',  room:'Lab 1',   start:'07:30', end:'08:20', status:'done' },
    { id:2, period:'P2', subject:'Mathematics', teacher:'Mr. Deshmukh',  room:'Room 203',start:'08:20', end:'09:10', status:'done' },
    { id:'b1', break:true, label:'Break', time:'09:10 – 09:30' },
    { id:3, period:'P3', subject:'History',     teacher:'Ms. Pawar',     room:'Room 202',start:'09:30', end:'10:20', status:'done' },
  ],
}

export const homeworkItems = [
  { id:'hw1', subject:'Mathematics', teacher:'Mr. Deshmukh', title:'Chapter 5 Exercise 5.3',   status:'due-today',  due:'Today, 10 Apr' },
  { id:'hw2', subject:'English',     teacher:'Ms. Fernandes',title:'Essay: My Favourite Season',status:'due-today',  due:'Today, 10 Apr' },
  { id:'hw3', subject:'Science',     teacher:'Ms. Kulkarni', title:'Diagram: Digestive System', status:'pending',    due:'Tomorrow, 11 Apr' },
  { id:'hw4', subject:'History',     teacher:'Ms. Pawar',    title:'Notes: Mughal Empire Ch. 4',status:'overdue',    due:'8 Apr (Overdue)' },
  { id:'hw5', subject:'Marathi',     teacher:'Mr. Jadhav',   title:'निबंध: माझा आवडता सण',      status:'overdue',    due:'7 Apr (Overdue)' },
  { id:'hw6', subject:'Mathematics', teacher:'Mr. Deshmukh', title:'Chapter 4 Exercise 4.1 & 4.2',status:'submitted',due:'5 Apr' },
  { id:'hw7', subject:'English',     teacher:'Ms. Fernandes',title:'Reading Comprehension – Unit 3',status:'submitted',due:'3 Apr' },
  { id:'hw8', subject:'Science',     teacher:'Ms. Kulkarni', title:'Lab Report – Water Cycle Experiment',status:'submitted',due:'1 Apr' },
  { id:'hw9', subject:'Geography',   teacher:'Ms. Shah',     title:'Map Work – Physical Features', status:'pending',  due:'12 Apr' },
]

export const results = {
  exams: ['Unit Test 2', 'Unit Test 1', 'Half Yearly', 'Quarterly'],
  current: {
    name: 'Unit Test 2',
    year: '2024-25',
    standard: 'Std 8 Div A',
    totalMarks: 342,
    totalMax: 400,
    percentage: 85.5,
    grade: 'A+',
    rank: 4,
    classSize: 41,
    highest: 91.2,
    classAvg: 74.3,
    subjects: [
      { name:'Mathematics', teacher:'Mr. Kulkarni', score:62, max:70, grade:'A+', color:'#2563eb', bg:'#dbeafe', trend:'up' },
      { name:'Science',     teacher:'Ms. Desai',   score:58, max:70, grade:'A',  color:'#0a9396', bg:'#ccfbf1', trend:'flat' },
      { name:'English',     teacher:'Ms. Sharma',  score:54, max:60, grade:'A',  color:'#7c3aed', bg:'#ede9fe', trend:'up' },
      { name:'Marathi',     teacher:'Mr. Jadhav',  score:42, max:50, grade:'B+', color:'#ea580c', bg:'#ffedd5', trend:'flat' },
      { name:'History',     teacher:'Ms. Pawar',   score:38, max:50, grade:'B',  color:'#16a34a', bg:'#dcfce7', trend:'flat' },
      { name:'Geography',   teacher:'Ms. Shah',    score:48, max:50, grade:'A+', color:'#d97706', bg:'#fef3c7', trend:'up' },
    ]
  }
}

export const inboxItems = [
  {
    id:'n1', type:'result', title:'Unit Test 2 Results Published', unread:true,
    preview:"Your results for Unit Test 2 are now available. Overall score: 342/400 (85.5%). Tap to view ...",
    sender:'School Admin', time:'Today',
    icon:'📊', iconBg:'#ccfbf1', iconColor:'#0a9396',
  },
  {
    id:'n2', type:'notice', title:'Unit Test Timetable – November', unread:true,
    preview:"The timetable for Unit Test 3 has been uploaded. Tests begin from 18 November 20...",
    sender:'Ms. Patil, Class Teacher', time:'Yesterday', pinned:true,
    icon:'📢', iconBg:'#dbeafe', iconColor:'#2563eb',
  },
  {
    id:'n3', type:'homework', title:'Science Project Submission Re...', unread:false,
    preview:'Your Science project on "Renewable Energy" is due on 12 November. Please submit the re...',
    sender:'Ms. Desai', time:'2 days ago',
    icon:'📋', iconBg:'#ede9fe', iconColor:'#7c3aed',
  },
  {
    id:'n4', type:'fee', title:'Fee Installment Due – November', unread:true,
    preview:'The second installment of ₹4,500 is due on 15 November 2024. Please clear dues to avoid l...',
    sender:'Accounts Office', time:'3 days ago',
    icon:'💳', iconBg:'#fef3c7', iconColor:'#d97706',
  },
  {
    id:'n5', type:'notice', title:'School Annual Day – Save the D...', unread:false,
    preview:'Annual Day celebrations will be held on 20 December 2024. All students are requested ...',
    sender:'Principal', time:'5 days ago',
    icon:'🔔', iconBg:'#fee2e2', iconColor:'#dc2626',
  },
  {
    id:'n6', type:'homework', title:'Mathematics Homework – Chap...', unread:false,
    preview:'Chapter 6 exercise 6.1 and 6.2 to be completed and submitted by Friday.',
    sender:'Mr. Deshmukh', time:'1 week ago',
    icon:'🔢', iconBg:'#dbeafe', iconColor:'#2563eb',
  },
]
