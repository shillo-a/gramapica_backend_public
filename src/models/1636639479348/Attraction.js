import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Attraction extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "id притяжения",
      primaryKey: true
    },
    attraction_source_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'custom_attraction',
        key: 'id'
      }
    },
    attraction_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'attraction_category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'attraction',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "attraction_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Attraction;
  }
}
