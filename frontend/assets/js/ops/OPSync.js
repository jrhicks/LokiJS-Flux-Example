import React from 'react';
import OPStore from '../ops/OPStore';
import OPActions from '../ops/OPActions';
import agent from 'superagent-promise';

function timeOut(t) {
  var p = new Promise(function(resolve, reject) {
    setTimeout(()=> resolve(), t);
  });
  return p;
}

async function opSync() {
  let partition = {key: 'active_projects', entity: 'note', filter: {project_id: 501}, cursor: {id: null, updated_at: null}};
  let pJson = encodeURIComponent(JSON.stringify(partition));
  let response = await agent.get('/op_store/getChanges?partition=' + pJson).end();
  let data = JSON.parse(response.text);
  for (var d of data) {
    OPActions.loadServerChange(partition, d);
    await timeOut(0);
  }

}

module.exports = opSync;
