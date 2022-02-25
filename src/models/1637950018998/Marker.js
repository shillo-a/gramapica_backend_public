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
    image_filename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_description: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    coordinate_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    coordinate_latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coordinate_longitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    boundary_latitude_top_left: {
      type: DataTypes.STRING,
      allowNull: true
    },
    boundary_longitude_top_left: {
      type: DataTypes.STRING,
      allowNull: true
    },
    boundary_latitude_bottom_right: {
      type: DataTypes.STRING,
      allowNull: true
    },
    boundary_longitude_bottom_right: {
      type: DataTypes.STRING,
      allowNull: true
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
