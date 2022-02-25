import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ReviewGlobalImage extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    review_global_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'review_global',
        key: 'id'
      }
    },
    order_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'review_global_image',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "review_global_image_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return ReviewGlobalImage;
  }
}
