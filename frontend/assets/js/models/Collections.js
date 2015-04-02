import Loki from 'lokijs';

class Collections {

  constructor() {
    let loki = new Loki('ReplicatedDB');
    this.loki = loki;

    // REPLICATION METADATA
    this.subscription = this.loki.addCollection('subscription', {indices:['id']});

    // DOMAIN COLLECTIONS
    this.project = this.loki.addCollection('project', {indices:['id']});
    this.note = this.loki.addCollection('note', {indices:['id']});
    this.contact = this.loki.addCollection('contact', {indices:['id']});
  }

}

module.exports = new Collections();
