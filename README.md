# School System Product Documentation

## Purpose
This documentation package defines a practical product plan for a school operating system built for Maharashtra-style school workflows. It covers product goals, architecture, workflows, UI/UX direction, role-based access, and phased delivery.

The product is designed as one system with three experiences:
- Teacher mobile app
- Student mobile app
- Admin web console

## Product Vision
Build a school operating system that gives every stakeholder one trusted source of truth for academics, attendance, exams, fees, communication, and AI-assisted school operations.

## Problem Statement
Most schools still run on a mix of registers, spreadsheets, WhatsApp groups, fee ledgers, and separate portals. This causes:
- Duplicate student data across multiple tools
- Unclear permissions between class teachers and subject teachers
- Delayed attendance, homework, and result updates
- Weak monitoring for fees, notices, and record changes
- Low parent and student visibility into daily school activity

## Product Goals
- Support real school hierarchy: school, academic year, standard, division, class teacher, subject teacher
- Give class teachers broader class-level access and subject teachers only subject-scoped access
- Make teacher and student interfaces simple, fast, and mobile-first
- Give admins full monitoring for academics, fees, and audit logs
- Support bilingual operation with Marathi and English
- Keep the design friendly for non-technical staff and low-connectivity environments

## Non-Goals
- Full LMS parity in phase 1
- Transport, hostel, and biometric device integrations in the first release
- Direct automation of marks or fee decisions without human approval

## User Roles
| Role | Primary responsibility | Core access |
| --- | --- | --- |
| Principal / Admin | Monitor school-wide operations | Full school-level access |
| Class Teacher | Manage a specific division | Full division view, attendance, notices, remarks, parent follow-up |
| Subject Teacher | Teach assigned subjects to assigned divisions | Subject-scoped homework, marks, material, notices |
| Exam Coordinator | Run exam cycles | Exam setup, mark windows, result publishing |
| Accounts / Fee Clerk | Manage fee lifecycle | Fee plans, receipts, dues, concessions, reports |
| Student | Track daily academic life | Own timetable, homework, attendance, results, notices |
| Parent / Guardian | Monitor student progress | Child-linked notices, fee status, attendance alerts, results |

## Core Modules
- Identity and access control
- School and academic setup
- Student information system
- Teacher allocation and workload
- Attendance
- Homework and assignments
- Exams, marks, and report cards
- Timetable
- Broadcasts and notices
- Fees and receipts
- AI assistant with guardrails
- Reports and audit logs

## Recommended Delivery Scope
### MVP
- Login and role-based access
- School setup, standards, divisions, subjects, teacher assignments
- Teacher attendance, homework, timetable, marks
- Student timetable, homework, attendance view, results, notices
- Admin monitoring, fee tracking, broadcast control, audit logs

### Phase 2
- Parent app
- Leave requests
- Document center
- Stronger analytics
- AI-generated summaries and multilingual communication

### Phase 3
- Official portal import/export workflows
- Advanced board-specific report formats
- Scholarships and document workflows
- Device integrations and advanced automation

## Documentation Map
- [Architecture](./architecture.md)
- [Workflows](./workflows.md)
- [UI UX Design](./ui-ux.md)

## Planning Assumptions
- One school may support multiple boards and mediums, but the system should keep board and medium configurable
- A student belongs to one division per academic year
- One division usually has one class teacher, but many subject teachers
- Mobile usage is primary for teachers and students; web usage is primary for admins and accounts staff
- Attendance and homework should support offline-first entry with later sync

## Reference Links
- [Maharashtra school education overview](https://www.maharashtra.gov.in/Site/1561/Schooling)
- [UDISE+ official portal](https://udiseplus.gov.in/ud/homePage/index.jsp)
- [Maharashtra SARAL GR reference](https://gr.maharashtra.gov.in/Site/Upload/Government%20Resolutions/Marathi/201701091217229521.pdf)
- [Maharashtra eMarksheet portal](https://boardmarksheet.maharashtra.gov.in/emarksheet/INDEX.jsp)
- [Maharashtra fee regulation reference 1](https://indiankanoon.org/doc/156202145/)
- [Maharashtra fee regulation reference 2](https://indiankanoon.org/doc/32076450/)
- [Maharashtra fee regulation reference 3](https://indiankanoon.org/doc/49382697/)
