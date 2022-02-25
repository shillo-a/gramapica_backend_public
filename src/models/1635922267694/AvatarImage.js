import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class AvatarImage extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "id изображения",
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "наименование изображения для поиска в файловом хранилище"
    }
  }, {
    sequelize,
    tableName: 'avatar_image',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "avatar_image_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return AvatarImage;
  }
}
