# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

1.times do
  p = Project.new
  p.name = Faker::App.name + ' - ' + Faker::Company.name
  print p.name
  p.city = Faker::Address.city
  p.state = Faker::Address.state_abbr
  p.status = ['Active', 'Completed', 'Cancelled'].sample
  p.save!
  contact_ids = []
  print "Adding Contacts"
  1000.times do
    c = p.contacts.new
    c.name = Faker::Name.name
    c.email = Faker::Internet.email
    c.phone = Faker::PhoneNumber.cell_phone
    c.company = Faker::Company.name
    c.title = Faker::Name.title
    c.save!
    contact_ids << c.id
  end
  print "Adding Notes"
  x = 0
  10.times do
    print "Adding batch of 1000 notes."
    1000.times do
      n = p.notes.new
      n.contact_id = contact_ids.sample
      n.message = Faker::Lorem.sentence
      n.save!
    end
  end
end
