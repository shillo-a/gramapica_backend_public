import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Marker extends Model {
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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    coordinate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'coordinate',
        key: 'id'
      }
    },
    marker_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'marker_image',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'marker',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "marker_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Marker;
  }
}
