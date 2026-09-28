var T = 'u_institution_details';
function addField(elem, label, type, opts) {
  opts = opts || {};
  var d = new GlideRecord('sys_dictionary');
  d.addQuery('name', T); d.addQuery('element', elem); d.query();
  if (d.next()) { gs.print(elem + ' exists'); return d.getUniqueValue(); }
  var n = new GlideRecord('sys_dictionary');
  n.initialize();
  n.name = T; n.element = elem; n.column_label = label; n.internal_type = type;
  if (opts.max_length) n.max_length = opts.max_length;
  if (opts.reference) n.reference = opts.reference;
  if (opts.choice) n.choice = opts.choice;
  var id = n.insert();
  gs.print('created ' + elem + ' (' + type + '): ' + id);
  return id;
}
addField('u_student_roll_number', 'Student Roll Number', 'string', {max_length: 40});
addField('u_student_name', 'Student Name', 'reference', {reference: 'sys_user'});
addField('u_faculty_name', 'Faculty Name', 'reference', {reference: 'sys_user'});
addField('u_branch', 'Branch', 'string', {max_length: 40, choice: 3});
addField('u_email', 'Email', 'string', {max_length: 100});
addField('u_phone_number', 'Phone Number', 'string', {max_length: 40});
addField('u_description', 'Description', 'string', {max_length: 4000});
['ECE','EEE','CSE'].forEach(function(v, i){
  var c = new GlideRecord('sys_choice');
  c.addQuery('name', T); c.addQuery('element','u_branch'); c.addQuery('value', v); c.query();
  if (c.next()) { gs.print('choice ' + v + ' exists'); return; }
  var nc = new GlideRecord('sys_choice');
  nc.initialize();
  nc.name = T; nc.element = 'u_branch'; nc.label = v; nc.value = v; nc.sequence = (i+1)*100; nc.language = 'en';
  nc.insert();
  gs.print('choice added: ' + v);
});
gs.print('COLUMNS DONE');
