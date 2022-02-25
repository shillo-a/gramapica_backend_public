import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Boundary extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    latitudeTL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitudeTL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitudeBR: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitudeBR: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'boundary',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "boundary_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Boundary;
  }
}
