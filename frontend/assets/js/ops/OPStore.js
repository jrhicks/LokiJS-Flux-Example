import alt from '../alt';
import objectAssign from 'object-assign';
import OPActions from '../ops/OPActions';
import objectValues from 'object-values';

class OPStore {

  constructor() {
    this.bindActions(OPActions);
    this.partitions = {};
  }

  static allPartitions() {
    return objectValues(this.getState().partitions);
  }

  static allRecords(key) {
    let p = this.getState().partitions[key];
    if (p) {
      return objectValues(p.records);
    }
    else {
      return [];
    }
  }

  onEnsurePartition(partition) {
    let {key, filter, entity} = partition;
    if (this.partitions.hasOwnProperty(partition.key)) {
      this.partitions[key] = objectAssign(this.partitions[key], {lastEnsured: new Date().getTime()})
    } else {
      this.partitions[key] = {
        key: key,
        filter: filter,
        entity: entity,
        lastEnsured: new Date().getTime(),
        lastSync: null,
        lastUpdatedCursor: null,
        lastIdCursor: null,
        cursorAtEnd: false,
        conflicts: [],
        localChanges: [],
        records: {}
      }
    }
  }

  onLoadServerChanges(payload) {
    let {partition, records} = payload;
    let p = this.partitions[partition.key];
    for (let r of records) {
      if (p.records.hasOwnProperty(r.id)) {
        console.log("Already Here");
      } else {
        p.records[r.id] = {data: r};
        p.lastIdCursor = r.id;
        p.lastUpdatedCursor = r.updated_at;
      }
    }
  }

}

module.exports = alt.createStore(OPStore);
