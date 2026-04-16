# School System UI UX Design

## Design Intent
The UI should feel calm, direct, and trustworthy. It must work for busy teachers, young students, school clerks, and principals without looking overloaded or corporate-heavy.

This is a utility product for everyday school work, so the design should optimize for:
- Fast understanding
- Large touch targets
- Clear labels
- Minimal typing
- Local-language friendliness
- Consistent actions across roles

## UX Principles
- One primary action per screen
- Show only the data needed for the current role
- Use cards and grouped actions, not dense tables, on mobile
- Keep all critical workflows within three taps from the home screen
- Preserve the same component language across teacher, student, and admin surfaces
- Always show class, subject, and date context at the top of task screens

## Visual Direction
Avoid an overly playful look. Aim for a modern school operations interface with warmth and clarity.

### Color System
- Primary: deep blue for trust and structure
- Secondary: teal for active academic states
- Success: green for submitted and paid states
- Warning: amber for dues, low attendance, and pending review
- Danger: red for absent, overdue, and rejected states
- Background: soft neutral with light warm tint instead of pure white

Suggested token set:

```text
--color-primary-700: #1f4e79
--color-primary-500: #2d6ea3
--color-accent-500: #0f8b8d
--color-success-500: #2e8b57
--color-warning-500: #d8891c
--color-danger-500: #c44536
--color-bg: #f7f4ee
--color-surface: #fffdf9
--color-text: #1d2733
--color-muted: #65758b
```

### Typography
- Headings: `Manrope` or `Plus Jakarta Sans`
- Body: `Source Sans 3`
- Marathi support: keep a font fallback with strong Devanagari rendering

### Shape and Spacing
- Rounded cards, not sharp enterprise panels
- 8-point spacing system
- Touch targets at least 44 px high
- Sticky bottom actions on mobile forms

## Information Architecture
### Teacher App Navigation
- Home
- Attendance
- Classes
- Exams
- Messages
- Profile

### Teacher Home Priorities
- Today's classes
- Attendance pending
- Homework pending
- Exams awaiting action
- Broadcast shortcuts
- AI assistant entry

### Student App Navigation
- Home
- Timetable
- Homework
- Results
- Inbox
- Profile

### Student Home Priorities
- Today's timetable
- Due homework
- Latest result update
- Attendance summary
- Fee due or cleared status
- Notices

### Admin Web Navigation
- Dashboard
- Students
- Staff
- Academics
- Exams
- Fees
- Communications
- Reports
- Settings

## Role-Specific Screen Strategy
### Teacher App
Teacher flows should start from role-aware dashboards.

If the user is a class teacher, show:
- Division attendance status
- Absent students needing follow-up
- Parent communication alerts
- Result review reminders

If the user is a subject teacher, show:
- Today's periods
- Subject-wise homework shortcuts
- Pending mark entry
- Recent student submissions

### Student App
Student flows should reduce anxiety.

Show:
- What is due today
- What changed today
- What needs attention next

Avoid:
- Overwhelming analytics
- Too many tabs
- Dense mark tables on the first screen

### Admin Console
Admin flows should prioritize monitoring and exception handling.

Show:
- Missing attendance submissions
- Fee collection trend
- Pending result approvals
- Broadcast delivery failures
- Students with long absences

## Mobile Wireframe Concepts
### Teacher Home
```text
+--------------------------------------------------+
| Good morning, Ms. Patil                          |
| Std 8 Div A | Class Teacher                      |
+--------------------------------------------------+
| Attendance Pending                               |
| 41 students | Mark now                           |
+-------------------+------------------------------+
| Today's Periods   | Homework to Review           |
| 4 periods         | 12 submissions               |
+-------------------+------------------------------+
| Broadcast Shortcut                               |
| Send class notice                                |
+--------------------------------------------------+
| Students Need Attention                          |
| 3 absent for 3+ days                             |
+--------------------------------------------------+
| Ask AI                                            |
| Draft a Marathi notice / summarize weak students |
+--------------------------------------------------+
| Home | Attendance | Classes | Exams | Messages   |
+--------------------------------------------------+
```

### Student Home
```text
+--------------------------------------------------+
| Good morning, Aarav                              |
| Std 8 Div A                                      |
+--------------------------------------------------+
| Today's Timetable                                |
| Maths | Science | Marathi | History              |
+-------------------+------------------------------+
| Homework Due      | Attendance This Month        |
| 2 tasks           | 92 percent                   |
+-------------------+------------------------------+
| New Notice                                        |
| Unit test timetable uploaded                     |
+--------------------------------------------------+
| Fee Status                                        |
| Next installment due on 15 June                  |
+--------------------------------------------------+
| Home | Timetable | Homework | Results | Inbox    |
+--------------------------------------------------+
```

## Desktop Layout Guidance
Admin screens should use:
- Left navigation rail
- Top filters and academic-year switcher
- Summary cards first
- Exceptions and pending actions second
- Full tables only after summary context

## Component Library
Shared components:
- App shell
- Role badge
- Standard and division pill
- Status chip
- Alert card
- Empty state
- Timeline row
- Approval drawer
- Search and filter bar
- Audit history panel

Role-specific components:
- Attendance grid
- Homework composer
- Mark entry sheet
- Fee ledger card
- Broadcast composer
- AI draft panel

## UX Patterns by Workflow
### Attendance
- Default to present-all with quick absent toggles if the school prefers that pattern
- Keep student photo, roll number, and previous absence hint visible
- Allow draft save when internet is unstable

### Homework
- Start with class, subject, due date, then description
- Attachments should be optional and easy to preview
- Show delivery status after publishing

### Exam Marks
- Freeze class and subject context in the header
- Validate max marks inline
- Highlight missing entries before submit

### Fees
- Show paid, due, overdue states clearly
- Separate transaction history from editable actions
- Always surface receipt ID

### Broadcasts
- Force the sender to pick scope first
- Preview recipients before publish
- Show school-wide messages with stronger review cues

## Accessibility and Usability Rules
- Marathi and English language switch available from profile and login
- Support large text without layout breakage
- Use icons only with labels
- Keep color as a secondary cue, never the only cue
- Screen-reader labels for all form controls
- Avoid gesture-only interactions for critical actions

## Empty, Error, and Offline States
- Empty states should explain the next step in plain language
- Error states should say what failed and what can be retried
- Offline mode should show a visible sync badge and last synced time

## Recommended UX Validation Plan
- Test with one principal
- Test with two class teachers
- Test with two subject teachers
- Test with one accounts clerk
- Test with four students from different standards
- Validate first-run understanding, attendance speed, homework posting speed, and fee clarity

## UI UX Outcome We Want
Users should feel:
- I know what I need to do next
- I cannot accidentally edit the wrong class or subject
- I can complete core school work quickly
- The system is clean enough to trust daily
