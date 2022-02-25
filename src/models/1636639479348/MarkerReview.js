import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class MarkerReview extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marker_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_like: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'marker_review',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "marker_review_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return MarkerReview;
  }
}
