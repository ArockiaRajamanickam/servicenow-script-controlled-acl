var T = 'u_institution_details';
var rows = [
  {roll:'ECE001', name:'Abel Tuter',        fac:'Abraham Lincoln', branch:'ECE', email:'ece001@college.edu', phone:'9000000001', desc:'ECE branch student record'},
  {roll:'EEE001', name:'Adela Cervantsz',   fac:'Abraham Lincoln', branch:'EEE', email:'eee001@college.edu', phone:'9000000002', desc:'EEE branch student record'},
  {roll:'EEE002', name:'Aileen Mottern',    fac:'Abraham Lincoln', branch:'EEE', email:'eee002@college.edu', phone:'9000000003', desc:'EEE branch student record 2'},
  {roll:'CSE001', name:'Alejandra Prenatt', fac:'Abraham Lincoln', branch:'CSE', email:'cse001@college.edu', phone:'9000000004', desc:'CSE branch student record'}
];
function userId(n){ var u = new GlideRecord('sys_user'); u.addQuery('name', n); u.query(); return u.next() ? u.getUniqueValue() : ''; }
rows.forEach(function(r){
  var g = new GlideRecord(T); g.addQuery('u_student_roll_number', r.roll); g.query();
  if (g.next()) { gs.print(r.roll + ' exists'); return; }
  var n = new GlideRecord(T); n.initialize();
  n.u_student_roll_number = r.roll; n.u_student_name = userId(r.name); n.u_faculty_name = userId(r.fac);
  n.u_branch = r.branch; n.u_email = r.email; n.u_phone_number = r.phone; n.u_description = r.desc;
  var id = n.insert(); gs.print('inserted ' + r.roll + ' (' + r.branch + '): ' + id);
});
gs.print('RECORDS DONE');
