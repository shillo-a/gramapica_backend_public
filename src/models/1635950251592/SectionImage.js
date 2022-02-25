import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class SectionImage extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "id изображения для раздела",
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
    tableName: 'section_image',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "section_image_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return SectionImage;
  }
}
