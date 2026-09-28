// Background script: create custom roles bb1..bb4 and assign them to the test user "EEE User"
var roles = ['bb1','bb2','bb3','bb4'];
var eee = new GlideRecord('sys_user');
eee.addQuery('user_name','EEE User');
eee.query();
var eeeId = eee.next() ? eee.getUniqueValue() : '';
gs.print('EEE User sys_id: ' + eeeId);
roles.forEach(function(rn){
  var r = new GlideRecord('sys_user_role');
  r.addQuery('name', rn);
  r.query();
  var rid;
  if (r.next()) { rid = r.getUniqueValue(); gs.print(rn + ' exists: ' + rid); }
  else {
    var nr = new GlideRecord('sys_user_role');
    nr.initialize();
    nr.name = rn;
    nr.description = 'Custom role ' + rn + ' for Script-Controlled ACL project';
    rid = nr.insert();
    gs.print(rn + ' CREATED: ' + rid);
  }
  if (eeeId) {
    var has = new GlideRecord('sys_user_has_role');
    has.addQuery('user', eeeId);
    has.addQuery('role', rid);
    has.query();
    if (!has.next()) {
      var nh = new GlideRecord('sys_user_has_role');
      nh.initialize();
      nh.user = eeeId;
      nh.role = rid;
      nh.insert();
      gs.print('Assigned ' + rn + ' to EEE User');
    } else { gs.print(rn + ' already assigned'); }
  }
});
gs.print('DONE');
