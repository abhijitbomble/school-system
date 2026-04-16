# School System Workflows

## Workflow Goals
These workflows are designed around real day-to-day school operations:
- Fast teacher actions during busy school hours
- Clear approvals for sensitive records
- Low confusion between class teacher and subject teacher responsibilities
- Full auditability for admin monitoring

## 1. Teacher Daily Workflow
```mermaid
flowchart TD
    A[Teacher signs in] --> B{Role type}
    B -->|Class teacher| C[Open class dashboard]
    B -->|Subject teacher| D[Open subject dashboard]
    C --> E[Mark daily attendance]
    C --> F[Check fee or follow-up alerts]
    C --> G[Send class notice]
    C --> H[Review weak students]
    D --> I[Open today's periods]
    D --> J[Upload homework or material]
    D --> K[Enter marks for assigned subject]
    D --> L[Send subject notice]
    E --> M[Attendance synced and logged]
    J --> N[Students notified]
    K --> O[Marks stored as draft or final]
```

## 2. Attendance Workflow
```mermaid
sequenceDiagram
    participant Teacher as Class Teacher App
    participant API as API Layer
    participant Policy as RBAC Policy
    participant Attendance as Attendance Module
    participant Audit as Audit Log
    participant Notify as Notification Service

    Teacher->>API: Submit attendance for Std 8 Div A
    API->>Policy: Validate teacher scope
    Policy-->>API: Allowed
    API->>Attendance: Save attendance batch
    Attendance-->>API: Saved with sync version
    API->>Audit: Record attendance action
    API->>Notify: Trigger absence alerts if configured
    API-->>Teacher: Success with summary
```

### Attendance Business Rules
- Class teacher can submit division-wide daily attendance
- Subject teacher can only submit period attendance if school enables the feature
- Late edits after cutoff should require reason capture
- Admin sees attendance exceptions and missing submissions

## 3. Homework and Assignment Workflow
```mermaid
sequenceDiagram
    participant ST as Subject Teacher App
    participant API as API Layer
    participant Policy as RBAC Policy
    participant HW as Homework Module
    participant NS as Notification Service
    participant SA as Student App

    ST->>API: Create homework for Maths in Std 7 Div B
    API->>Policy: Validate subject assignment
    Policy-->>API: Allowed
    API->>HW: Save homework with due date and attachments
    HW-->>API: Homework created
    API->>NS: Push assignment notification
    NS->>SA: Notify linked students and parents
    API-->>ST: Homework published
```

## 4. Exam and Result Workflow
```mermaid
flowchart TD
    A[Exam coordinator creates exam structure] --> B[Assign subjects and mark rules]
    B --> C[Open mark entry window]
    C --> D[Subject teacher enters marks]
    D --> E[Validation on max marks and missing entries]
    E --> F[Class teacher reviews student completeness]
    F --> G[Exam coordinator checks pending items]
    G --> H[Principal or admin approves publication]
    H --> I[Results published to student and parent apps]
    I --> J[Audit trail and downloadable report cards]
```

### Exam Control Rules
- Subject teachers only edit marks for their allocated subject and class
- Result publication should never happen directly from teacher screens
- Any post-publication correction should create a correction log

## 5. Fee Workflow
```mermaid
flowchart TD
    A[Admin defines fee structure by standard] --> B[System generates student fee plans]
    B --> C[Accounts staff records payment]
    C --> D[Receipt generated]
    D --> E[Ledger updated]
    E --> F[Parent and student see updated status]
    B --> G[Due date passes]
    G --> H[Reminder job runs]
    H --> I[Reminder sent to parent and student]
    C --> J[Audit log and cashier report updated]
```

### Fee Rules
- Fee edits and concessions should support approval workflow
- Receipts should not be silently overwritten
- Student app shows status only; edit rights stay with finance roles

## 6. Broadcast Workflow
```mermaid
flowchart LR
    A[User drafts message] --> B{Message scope}
    B -->|School-wide| C[Admin approval required]
    B -->|Division-wide| D[Class teacher or admin]
    B -->|Subject-specific| E[Assigned subject teacher]
    C --> F[Publish]
    D --> F
    E --> F
    F --> G[Push notification]
    F --> H[In-app inbox]
    F --> I[Delivery status stored]
```

## 7. AI Assistant Workflow
```mermaid
sequenceDiagram
    participant User as App User
    participant Gateway as AI Gateway
    participant Policy as Permission Filter
    participant Data as School Data Context
    participant Guardrail as Action Guardrail

    User->>Gateway: "Draft a Marathi notice for tomorrow's unit test"
    Gateway->>Policy: Check user role and allowed data scope
    Policy->>Data: Fetch only permitted context
    Data-->>Gateway: Filtered context
    Gateway->>Guardrail: Validate action type
    Guardrail-->>Gateway: Allowed as draft-only action
    Gateway-->>User: Notice draft with confirmation CTA
```

### AI Guardrails
- AI can suggest, summarize, translate, and draft
- AI cannot directly finalize marks, fee changes, or attendance corrections
- Any AI-produced action must show the originating data scope and ask for human confirmation

## 8. Student Daily Workflow
```mermaid
flowchart TD
    A[Student signs in] --> B[Home dashboard]
    B --> C[Today's timetable]
    B --> D[Pending homework]
    B --> E[Attendance summary]
    B --> F[Recent notices]
    B --> G[Fee due card]
    D --> H[Open assignment details]
    H --> I[Submit work or mark complete]
    F --> J[Acknowledge important circular]
    E --> K[View monthly attendance pattern]
```

## Workflow Design Takeaways
- Class teacher workflows are division-centric
- Subject teacher workflows are subject-centric
- Admin workflows are monitoring-centric
- Student workflows are clarity-centric
- Sensitive operations use staged approvals and audit logs
