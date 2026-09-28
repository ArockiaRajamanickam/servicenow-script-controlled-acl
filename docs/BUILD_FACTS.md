# Build facts (ground truth) — Script-Controlled ACL project
Instance: dev443713.service-now.com (ServiceNow Personal Developer Instance, Australia release). Built 2026-09-28.

## Milestone 1 — Users and Roles
- Test user: User ID `EEE User`, First name `EEE`, Last name `User`, Email `eeeuser@gmail.com` (sys_id cb13ff5a9363471068e435018bba10ec). Created via User Administration > Users > New.
- Roles created: `bb1`, `bb2`, `bb3`, `bb4` (Description "Custom role bbN for Script-Controlled ACL project"), all assigned to EEE User. (scripts/01_create_roles_and_assign.js)

## Milestone 2 — Table
- Table: Label `Institution Details`, Name `u_institution_details`, Extends: none. Created via System Definition > Tables > New.
- Columns (scripts/02_create_columns_and_branch_choices.js): Student Roll Number (String), Student Name (Reference→User), Faculty Name (Reference→User), Branch (Choice: ECE, EEE, CSE), Email (String), Phone Number (String), Description (String 4000).
- Sample records (scripts/03_insert_sample_records.js): ECE001 (Abel Tuter, ECE), EEE001 (Adela Cervantsz, EEE), EEE002 (Aileen Mottern, EEE), CSE001 (Alejandra Prenatt, CSE); Faculty Name = Abraham Lincoln for all.

## Milestones 3–6 — Access Controls (type=record, table=u_institution_details, Decision Allow If, Active)
- Elevated to `security_admin` first (user menu > Elevate role).
- READ  (sys_id 179ff7d293e3471068e435018bba10a5): Requires role bb1; Advanced=true; Condition `Branch is EEE` (u_branch=EEE); Script = scripts/acl_read_script.js (admin→true, bb1→true, else false).
- CREATE (ee9fb7d293e3471068e435018bba10de): Requires role bb2. No condition/script.
- WRITE  (44aff7d293e3471068e435018bba10ce): Requires role bb3. No condition/script.
- DELETE (24af3bd293e3471068e435018bba1010): Requires role bb4. No condition/script.
- Note: creating the table auto-generated default ACLs for the 4 operations with a default role `u_institution_details_user`; that role was removed so each ACL requires only its bb role (scripts/04, 05).

## Milestone 7 — Verification (impersonation)
- Impersonate `EEE User` (has bb1–bb4): Institution Details list shows ONLY EEE001 and EEE002 (2 of 2); New button visible; opening EEE001 shows editable form with Update and Delete buttons.
- Impersonate `Abel Tuter` (no bb roles): list is replaced by "Security constraints prevent access to requested page".
- Admin (System Administrator): list shows all 4 records (CSE001, ECE001, EEE001, EEE002).

## Screenshot map (screenshots/)
- m1_user_EEEuser_record.png — EEE User record form
- m1_roles_bb1-bb4_list.png — Roles list filtered bb*
- m1_user_roles_assigned.png — EEE User's role assignments (bb1–bb4)
- m2_table_columns.png — Dictionary entries for u_institution_details (7 custom columns)
- m2_records_list.png — 4 sample records (admin view)
- m3_elevate_security_admin.png — user menu showing elevated security_admin
- m3_acl_read_bb1_script.png — READ ACL form (role bb1, description of condition+script)
- m3_acl_read_xml_condition_script.png — READ ACL XML: advanced=true, condition u_branch=EEE, full script
- m3_acl_all4_list_xml.png — all 4 ACL records as XML
- m3_acl_role_links_all4.png — ACL→role links list (bb1..bb4)
- m4_acl_create_bb2.png — CREATE ACL form (Operation create, Requires role bb2)
- m5_acl_write_bb3.png — WRITE ACL form (Operation write, Requires role bb3)
- m6_acl_delete_bb4.png — DELETE ACL form (Operation delete, Requires role bb4)
- m7_impersonate_EEEuser_list_2EEE.png — impersonated as EEE User (avatar "EU", no Admin menu): sees only 2 EEE records + New
- m7_impersonate_EEEuser_form_update_delete.png — EEE User can open/edit; Update + Delete present
- m7_impersonate_norole_blocked.png — Abel Tuter blocked: "Security constraints prevent access"
- m7_admin_all4.png — admin sees all 4 records
