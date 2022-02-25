import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Article extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "id статьи по местам притяжения",
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "наименование статьи по местам притяжения"
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_user',
        key: 'id'
      }
    },
    article_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'article_status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'article',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "article_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Article;
  }
}
