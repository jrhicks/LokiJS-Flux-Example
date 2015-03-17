import alt from '../alt';
import objectAssign from 'object-assign';
import OPActions from '../ops/OPActions';

class OPStore {

  constructor() {
    this.bindActions(OPActions);
    this.partitions = {};
  }

  onEnsurePartition(partition) {
    let {key, filter, entity} = partition;
    if (this.partitions.hasOwnProperty(partition.key)) {
      this.partitions[key] = objectAssign(this.partitions[key], {lastEnsured: new Date().getTime()})
    } else {
      this.partitions[key] = {
        partition: partition,
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

  onLoadServerChange(payload) {
    let {partition, record} = payload;
    if (this.partitions[partition.key].records.hasOwnProperty(record.id)) {
      console.log("Already Here");
    } else {
      this.partitions[partition.key].records[record.id] = {data: record};
      this.partitions[partition.key].lastIdCursor = record.id;
      this.partitions[partition.key].lastUpdatedCursor = record.updated_at;
    }
  }

}

module.exports = alt.createStore(OPStore);
