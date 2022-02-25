import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Sex extends Model {
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
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sex',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "sex_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Sex;
  }
}
