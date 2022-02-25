import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class AuthUser extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    middle_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    avatar_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'avatar_image',
        key: 'id'
      }
    },
    sex_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sex',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'auth_user',
    schema: 'gramapica_db',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "auth_user_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return AuthUser;
  }
}
