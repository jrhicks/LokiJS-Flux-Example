class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :status

      t.timestamps null: false
    end
  end
end
