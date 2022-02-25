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
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'coordinate',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
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
