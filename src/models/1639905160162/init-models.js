import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Article from  "./Article.js";
import _ArticleReview from  "./ArticleReview.js";
import _ArticleStatus from  "./ArticleStatus.js";
import _ArticleTag from  "./ArticleTag.js";
import _AuthUser from  "./AuthUser.js";
import _AuthUserRole from  "./AuthUserRole.js";
import _Comment from  "./Comment.js";
import _GlobalLocation from  "./GlobalLocation.js";
import _Marker from  "./Marker.js";
import _Quote from  "./Quote.js";
import _ReviewGlobal from  "./ReviewGlobal.js";
import _ReviewGlobalImage from  "./ReviewGlobalImage.js";
import _Role from  "./Role.js";
import _Section from  "./Section.js";
import _SectionImage from  "./SectionImage.js";
import _SectionType from  "./SectionType.js";
import _Sex from  "./Sex.js";
import _Tag from  "./Tag.js";

export default function initModels(sequelize) {
  var Article = _Article.init(sequelize, DataTypes);
  var ArticleReview = _ArticleReview.init(sequelize, DataTypes);
  var ArticleStatus = _ArticleStatus.init(sequelize, DataTypes);
  var ArticleTag = _ArticleTag.init(sequelize, DataTypes);
  var AuthUser = _AuthUser.init(sequelize, DataTypes);
  var AuthUserRole = _AuthUserRole.init(sequelize, DataTypes);
  var Comment = _Comment.init(sequelize, DataTypes);
  var GlobalLocation = _GlobalLocation.init(sequelize, DataTypes);
  var Marker = _Marker.init(sequelize, DataTypes);
  var Quote = _Quote.init(sequelize, DataTypes);
  var ReviewGlobal = _ReviewGlobal.init(sequelize, DataTypes);
  var ReviewGlobalImage = _ReviewGlobalImage.init(sequelize, DataTypes);
  var Role = _Role.init(sequelize, DataTypes);
  var Section = _Section.init(sequelize, DataTypes);
  var SectionImage = _SectionImage.init(sequelize, DataTypes);
  var SectionType = _SectionType.init(sequelize, DataTypes);
  var Sex = _Sex.init(sequelize, DataTypes);
  var Tag = _Tag.init(sequelize, DataTypes);

      // BEGIN (custom relations belongsToMany)
      Article.belongsToMany(Tag, {as: "tags", through: 'article_tag', foreignKey: 'article_id', otherKey: 'tag_id' });
      Tag.belongsToMany(Article, {as: "articles", through: 'article_tag', foreignKey: 'tag_id', otherKey: 'article_id' });
      AuthUser.belongsToMany(Role, {as: "roles", through: 'auth_user_role', foreignKey: 'auth_user_id', otherKey: 'role_id' })
      Role.belongsToMany(AuthUser, {as: "users", through: 'auth_user_role', foreignKey: 'role_id', otherKey: 'auth_user_id' })
      // END (custom relations belongsToMany)
    
      // BEGIN (double association to include the same model twice)
      AuthUser.hasMany(Article, { as: "draft_articles", foreignKey: "author_id"});
      // END (double association to include the same model twice)  

  ArticleReview.belongsTo(Article, { as: "article", foreignKey: "article_id"});
  Article.hasMany(ArticleReview, { as: "article_reviews", foreignKey: "article_id"});
  ArticleTag.belongsTo(Article, { as: "article", foreignKey: "article_id"});
  Article.hasMany(ArticleTag, { as: "article_tags", foreignKey: "article_id"});
  Comment.belongsTo(Article, { as: "article", foreignKey: "article_id"});
  Article.hasMany(Comment, { as: "comments", foreignKey: "article_id"});
  Section.belongsTo(Article, { as: "article", foreignKey: "article_id"});
  Article.hasMany(Section, { as: "sections", foreignKey: "article_id"});
  Article.belongsTo(ArticleStatus, { as: "article_status", foreignKey: "article_status_id"});
  ArticleStatus.hasMany(Article, { as: "articles", foreignKey: "article_status_id"});
  Article.belongsTo(AuthUser, { as: "author", foreignKey: "author_id"});
  AuthUser.hasMany(Article, { as: "articles", foreignKey: "author_id"});
  ArticleReview.belongsTo(AuthUser, { as: "user", foreignKey: "user_id"});
  AuthUser.hasMany(ArticleReview, { as: "article_reviews", foreignKey: "user_id"});
  AuthUserRole.belongsTo(AuthUser, { as: "auth_user", foreignKey: "auth_user_id"});
  AuthUser.hasMany(AuthUserRole, { as: "auth_user_roles", foreignKey: "auth_user_id"});
  Comment.belongsTo(AuthUser, { as: "author", foreignKey: "author_id"});
  AuthUser.hasMany(Comment, { as: "comments", foreignKey: "author_id"});
  ReviewGlobal.belongsTo(AuthUser, { as: "user", foreignKey: "user_id"});
  AuthUser.hasMany(ReviewGlobal, { as: "review_globals", foreignKey: "user_id"});
  Comment.belongsTo(Comment, { as: "parent", foreignKey: "parent_id"});
  Comment.hasMany(Comment, { as: "comments", foreignKey: "parent_id"});
  Article.belongsTo(GlobalLocation, { as: "global_location", foreignKey: "global_location_id"});
  GlobalLocation.hasMany(Article, { as: "articles", foreignKey: "global_location_id"});
  Section.belongsTo(Marker, { as: "marker", foreignKey: "marker_id"});
  Marker.hasMany(Section, { as: "sections", foreignKey: "marker_id"});
  Section.belongsTo(Quote, { as: "quote", foreignKey: "quote_id"});
  Quote.hasMany(Section, { as: "sections", foreignKey: "quote_id"});
  ReviewGlobalImage.belongsTo(ReviewGlobal, { as: "review_global", foreignKey: "review_global_id"});
  ReviewGlobal.hasMany(ReviewGlobalImage, { as: "review_global_images", foreignKey: "review_global_id"});
  AuthUserRole.belongsTo(Role, { as: "role", foreignKey: "role_id"});
  Role.hasMany(AuthUserRole, { as: "auth_user_roles", foreignKey: "role_id"});
  Section.belongsTo(SectionImage, { as: "section_image", foreignKey: "section_image_id"});
  SectionImage.hasMany(Section, { as: "sections", foreignKey: "section_image_id"});
  Section.belongsTo(SectionType, { as: "section_type", foreignKey: "section_type_id"});
  SectionType.hasMany(Section, { as: "sections", foreignKey: "section_type_id"});
  AuthUser.belongsTo(Sex, { as: "sex", foreignKey: "sex_id"});
  Sex.hasMany(AuthUser, { as: "auth_users", foreignKey: "sex_id"});
  ArticleTag.belongsTo(Tag, { as: "tag", foreignKey: "tag_id"});
  Tag.hasMany(ArticleTag, { as: "article_tags", foreignKey: "tag_id"});

  return {
    Article,
    ArticleReview,
    ArticleStatus,
    ArticleTag,
    AuthUser,
    AuthUserRole,
    Comment,
    GlobalLocation,
    Marker,
    Quote,
    ReviewGlobal,
    ReviewGlobalImage,
    Role,
    Section,
    SectionImage,
    SectionType,
    Sex,
    Tag,
  };
}