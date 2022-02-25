import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ArticleStatus extends Model {
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
    tableName: 'article_status',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "article_status_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return ArticleStatus;
  }
}
