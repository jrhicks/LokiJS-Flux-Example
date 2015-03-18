import React from 'react';
import OPStore from './OPStore';
import OPActions from './OPActions';
import agent from 'superagent-promise';
import objectValues from 'object-values';

function timeOut(t) {
  var p = new Promise(function(resolve, reject) {
    setTimeout(()=> resolve(), t);
  });
  return p;
}

function opSyncAll() {
  let partitions =  OPStore.allPartitions();
  for (var p of partitions) {
    opSyncPartition(p);
  }
}

async function opSyncPartition(partition) {
  let scope = {
                entity: partition.entity,
                filter: partition.filter,
                lastIdCursor: partition.lastIdCursor,
                lastUpdatedCursor: partition.lastUpdatedCursor
              };
  console.log(scope);
  let scopeJson = encodeURIComponent(JSON.stringify(scope));
  let url = `/op_store/getChanges?scope=${scopeJson}`;
  let response = await agent.get(url).end();
  let data = JSON.parse(response.text);
  OPActions.loadServerChanges(partition, data);
}

module.exports = {opSyncPartition, opSyncAll}
