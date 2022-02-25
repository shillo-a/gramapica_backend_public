import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Attribute extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'attribute',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "attribute_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Attribute;
  }
}
