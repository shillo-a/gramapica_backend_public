import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Coordinate extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "id координаты конкретного места",
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'coordinate',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "coordinate_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Coordinate;
  }
}
