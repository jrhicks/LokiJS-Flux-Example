import t from 'tcomb';
import enums from './Enums';

let types = {
  contacts: t.struct({
    name: t.Str,
    email: t.Str,
    phone: t.Str,
    title: t.Str,
    company: t.Str,
    project_id: t.Num
  }),

  projects: t.struct({
    name: t.Str,
    city: t.Str,
    state: t.Str,
    status: t.Str
  }),

  notes: t.struct({
    project_id: t.Num,
    contact_id: t.Num,
    message: t.Str,
  })
}

module.exports = types;
