import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class SectionType extends Model {
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
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'section_type',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "section_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return SectionType;
  }
}
