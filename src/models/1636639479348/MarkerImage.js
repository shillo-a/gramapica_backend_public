import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class MarkerImage extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'marker_image',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "marker_image_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return MarkerImage;
  }
}
