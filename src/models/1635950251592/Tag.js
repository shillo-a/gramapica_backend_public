import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Tag extends Model {
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tag',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "tag_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Tag;
  }
}
