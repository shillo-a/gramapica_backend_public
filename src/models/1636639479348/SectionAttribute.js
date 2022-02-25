import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class SectionAttribute extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'attribute',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'section_attribute',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "section_attribute_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return SectionAttribute;
  }
}
