require 'json'

class OpStoreController < ApplicationController
  def getChanges()
    scope = JSON.parse(params[:scope]).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
    entity = scope[:entity]
    filter = scope[:filter].inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}

    m = entity.camelize.constantize
    if scope[:lastUpdatedCursor] && scope[:lastIdCursor]
      ci = scope[:lastIdCursor]
      cu = DateTime.parse(scope[:lastUpdatedCursor])
      data = m.where(filter).where(["updated_at > ? or (updated_at=? and id>?)", cu, cu, ci]).order("updated_at asc, id asc").limit(10)
    else
      data = m.where(filter).order("updated_at asc, id asc").limit(10)
    end
    render text: data.to_json
  end
end
