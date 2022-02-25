import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Section extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "id раздела статьи",
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
    marker_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'marker',
        key: 'id'
      }
    },
    order_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    header: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    section_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'section_image',
        key: 'id'
      }
    },
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'quote',
        key: 'id'
      }
    },
    section_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'section_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'section',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    delete: true,
    indexes: [
      {
        name: "section_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Section;
  }
}
