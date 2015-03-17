class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :title
      t.string :company
      t.references :project, index: true

      t.timestamps null: false
    end
    add_foreign_key :contacts, :projects
  end
end
