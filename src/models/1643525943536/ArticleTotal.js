import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ArticleTotal extends Model {
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
    total_views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_favorites: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Расчитывается на основе алгоритма сервером"
    },
    total_shares: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'article_total',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "article_total_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return ArticleTotal;
  }
}
