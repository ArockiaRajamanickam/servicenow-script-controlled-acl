# Script-Controlled ACL: Restrict Record Access Based on Field Value

ServiceNow System Administrator capstone project for Naan Mudhalvan (SmartBridge).

## Team

- Arockia Rajamanickam (Team Lead)
- John Richardson Dyriaraj C
- Saravana Kumar S
- Balaji S
- Geethesh B S

## Project summary

This project builds record-level, field-value based access control on a custom ServiceNow table so that a branch user can only see and manage the records that belong to their own branch. On the Institution Details table (`u_institution_details`), four Access Control rules were configured. The read rule requires the role `bb1`, is set to Advanced, carries the data condition Branch is EEE, and runs a script that allows admins and `bb1` users and denies everyone else. Create, write and delete are each tied to their own role (`bb2`, `bb3`, `bb4`). A test user, EEE User, holds all four roles.

The result was verified by impersonation. EEE User sees only the two EEE records and can create, update and delete them. A user with none of the roles is blocked with a security constraints message. The System Administrator sees all four records.

- Instance: dev443713.service-now.com (ServiceNow Personal Developer Instance)
- Build date: 28 September 2026

## Phase-wise submission (SmartInternz format)

| Phase | Folder | Deliverables |
|-------|--------|--------------|
| 1 | 1. Brainstorming & Ideation | Idea Prioritization, Define Problem Statements, Empathy Map |
| 2 | 2. Requirement Analysis | Customer Journey Map, Data Flow Diagram, Solution Requirements, Technology Stack |
| 3 | 3. Project Design Phase | Problem-Solution Fit, Proposed Solution, Solution Architecture |
| 4 | 4. Project Planning Phase | Project Planning |
| 5 | 5. Project Development Phase | Code Layout and Reusability, Coding and Solution, Functional Features |
| 6 | 6. Project Testing | Performance Testing |
| 7 | 7. Project Documentation | Project Executable Files, Sample Project Documentation |
| 8 | 8. Project Demonstration | Communication, Demonstration of Proposed Features, Project Demo Planning, Scalability and Future Plan, Team Involvement |

## Supporting evidence

- `scripts/` holds the five background scripts used to build the roles, table, fields, records and ACL configuration, plus the standalone read ACL script.
- `screenshots/` holds the proof screenshots captured from the instance, one set per milestone.
- `demo/demo.mp4` is a narrated walkthrough of the finished project.
- `docs/BUILD_FACTS.md` is the ground truth record for every object and sys_id used in the build.

## How to reproduce

1. Create the test user EEE User under User Administration, Users.
2. Run `scripts/01_create_roles_and_assign.js` to create roles bb1 to bb4 and assign them.
3. Create the table Institution Details (`u_institution_details`).
4. Run `scripts/02_create_columns_and_branch_choices.js` to add the seven columns and the Branch choices.
5. Run `scripts/03_insert_sample_records.js` to insert the four sample records.
6. Elevate to security_admin from the user menu.
7. Run `scripts/04_link_roles_to_acls.js` to link bb1 to bb4 to the read, create, write and delete ACLs.
8. Run `scripts/05_configure_read_acl_condition_and_script.js` to set the read ACL condition and script and remove the default role.
9. Verify by impersonating EEE User, then a user with no role, then the System Administrator.
