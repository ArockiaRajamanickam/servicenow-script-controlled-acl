var T = 'u_institution_details';
var docScript = "(function () {\n    // Allow admin users full access\n    if (gs.hasRole('admin')) {\n        return true;\n    }\n    // Allow only EEE branch users to see EEE records\n    if (gs.hasRole('bb1')){\n        return true;\n    }\n    // Deny access for all others\n    return false;\n})();";
var r = new GlideRecord('sys_security_acl'); r.addQuery('name', T); r.addQuery('operation', 'read'); r.addQuery('type', 'record'); r.query();
while (r.next()) { r.advanced = true; r.script = docScript; r.condition = 'u_branch=EEE'; r.active = true; r.update(); gs.print('read ACL updated (condition+script): ' + r.getUniqueValue()); }
var keep = {read:'bb1', create:'bb2', write:'bb3', 'delete':'bb4'};
var a = new GlideRecord('sys_security_acl'); a.addQuery('name', T); a.addQuery('type', 'record'); a.query();
while (a.next()) {
  var op = a.getValue('operation'); var want = keep[op]; if (!want) continue;
  var m = new GlideRecord('sys_security_acl_role'); m.addQuery('sys_security_acl', a.getUniqueValue()); m.query();
  while (m.next()) { var rn = m.sys_user_role.name + ''; if (rn != want) { gs.print(op + ': removing extra role ' + rn); m.deleteRecord(); } else { gs.print(op + ': keeps ' + rn); } }
}
gs.print('FIX DONE');
