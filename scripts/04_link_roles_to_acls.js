var T = 'u_institution_details';
function roleId(n){ var r = new GlideRecord('sys_user_role'); r.addQuery('name', n); r.query(); return r.next() ? r.getUniqueValue() : ''; }
function mkAcl(op, role, cond, advanced, script){
  var a = new GlideRecord('sys_security_acl');
  a.addQuery('name', T); a.addQuery('operation', op); a.addQuery('type', 'record'); a.query();
  var id;
  if (a.next()) { id = a.getUniqueValue(); gs.print(op + ' ACL exists: ' + id); }
  else {
    var n = new GlideRecord('sys_security_acl'); n.initialize();
    n.name = T; n.type = 'record'; n.operation = op; n.active = true;
    n.description = 'Script-Controlled ACL project: ' + op + ' on Institution Details';
    if (cond) n.condition = cond;
    if (advanced) { n.advanced = true; n.script = script; }
    id = n.insert(); gs.print(op + ' ACL CREATED: ' + id);
  }
  var rid = roleId(role);
  var m = new GlideRecord('sys_security_acl_role'); m.addQuery('sys_security_acl', id); m.addQuery('sys_user_role', rid); m.query();
  if (!m.next()) { var nm = new GlideRecord('sys_security_acl_role'); nm.initialize(); nm.sys_security_acl = id; nm.sys_user_role = rid; nm.insert(); gs.print('  requires role ' + role); }
  else { gs.print('  role ' + role + ' already linked'); }
  return id;
}
var readScript = "(function () {\n    // Allow admin users full access\n    if (gs.hasRole('admin')) {\n        return true;\n    }\n    // Allow only EEE branch users to see EEE records\n    if (gs.hasRole('bb1')){\n        return true;\n    }\n    // Deny access for all others\n    return false;\n})();";
mkAcl('read',   'bb1', 'u_branch=EEE', true, readScript);
mkAcl('create', 'bb2', '', false, '');
mkAcl('write',  'bb3', '', false, '');
mkAcl('delete', 'bb4', '', false, '');
gs.print('ACLS DONE');
