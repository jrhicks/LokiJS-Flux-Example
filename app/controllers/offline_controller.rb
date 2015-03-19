require 'json'

class OfflineController < ApplicationController
  def download_updated()
    scope = JSON.parse(params[:scope]).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
    collection = scope[:collection]
    filter = (scope[:filter] || {}).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}

    m = collection.camelize.constantize
    if scope[:lastUpdatedCursor] && scope[:lastIdCursor]
      ci = scope[:lastIdCursor]
      cu = DateTime.parse(scope[:lastUpdatedCursor])
      data = m.where(filter).where(["updated_at > ? or (updated_at=? and id>?)", cu, cu, ci]).order("updated_at asc, id asc").limit(250)
    else
      data = m.where(filter).order("updated_at asc, id asc").limit(250)
    end
    render text: data.to_json
  end

  def count_updated()
    scope = JSON.parse(params[:scope]).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
    collection = scope[:collection]
    filter = (scope[:filter] || {}).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}

    m = collection.camelize.constantize
    if scope[:lastUpdatedCursor] && scope[:lastIdCursor]
      ci = scope[:lastIdCursor]
      cu = DateTime.parse(scope[:lastUpdatedCursor])
      data = m.where(filter).where(["updated_at > ? or (updated_at=? and id>?)", cu, cu, ci]).count
    else
      data = m.where(filter).count
    end
    render text: data.to_json
  end

end
