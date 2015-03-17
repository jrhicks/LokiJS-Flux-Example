class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.references :project, index: true
      t.references :contact, index: true
      t.string :message

      t.timestamps null: false
    end
    add_foreign_key :notes, :projects
    add_foreign_key :notes, :contacts
  end
end
