import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ArticleGlobalLocation extends Model {
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
    global_location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'global_location',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'article_global_location',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "article_global_location_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return ArticleGlobalLocation;
  }
}
