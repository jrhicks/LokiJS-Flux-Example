class Project < ActiveRecord::Base
  has_many :notes
  has_many :contacts

end
