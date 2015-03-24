require 'json'

class ReplicatedDBController < ApplicationController

  def download_updates()
    scope = JSON.parse(params[:scope]).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
    collectionName = scope[:collectionName]
    filter = (scope[:filter] || {}).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}

    m = collectionName.camelize.constantize
    if scope[:lastUpdatedCursor] && scope[:lastIdCursor]
      ci = scope[:lastIdCursor]
      cu = DateTime.parse(scope[:lastUpdatedCursor])
      data = m.where(filter).where(["updated_at > ? or (updated_at=? and id>?)", cu, cu, ci]).order("updated_at asc, id asc").limit(1000)
      count = m.where(filter).where(["updated_at > ? or (updated_at=? and id>?)", cu, cu, ci]).count
    else
      data = m.where(filter).order("updated_at asc, id asc").limit(1000)
      count = m.where(filter).order("updated_at asc, id asc").count
    end
    render text: {availableUpdatesCount: count, data: data.as_json}.to_json
  end

end
