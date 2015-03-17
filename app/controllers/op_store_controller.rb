require 'json'

class OpStoreController < ApplicationController
  def getChanges()
    partition = JSON.parse(params[:partition]).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
    entity = partition[:entity]
    filter = partition[:filter]
    cursor = partition[:cursor]
    m = entity.camelize.constantize
    if false && partition[:cursor]
      ci = partition[:cursor][:id]
      cu = partition[:cursor][:updated_at]
      data = m.where(filter).where(["updated_at > ? or (updated_at=? and id>?)", cu, cu, ci]).order("updated_at, id asc")
    else
      data = m.where(filter).order("updated_at, id asc")
    end
    render text: data.to_json
  end
end
