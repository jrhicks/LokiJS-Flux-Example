import Loki from 'lokijs';

let loki = new Loki('Test');

let db = {
  loki: loki,
  subscription: loki.addCollection('subscription', {indices:['id']}),

  project: loki.addCollection('project', {indices:['id']}),
  note: loki.addCollection('note', {indices:['id']}),
  contact: loki.addCollection('contact', {indices:['id']})
}

module.exports = db;
