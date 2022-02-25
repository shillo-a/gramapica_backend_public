import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Quote extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    person_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profession: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    avatar_filename: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quote',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "quote_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Quote;
  }
}
