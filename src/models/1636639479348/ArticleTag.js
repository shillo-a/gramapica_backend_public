import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ArticleTag extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'article',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'article_tag',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "article_tag_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return ArticleTag;
  }
}
