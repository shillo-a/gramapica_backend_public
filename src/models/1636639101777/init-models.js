import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Article from  "./Article.js";
import _ArticleImage from  "./ArticleImage.js";
import _ArticleReview from  "./ArticleReview.js";
import _ArticleStatus from  "./ArticleStatus.js";
import _ArticleTag from  "./ArticleTag.js";
import _Attraction from  "./Attraction.js";
import _AttractionCategory from  "./AttractionCategory.js";
import _Attribute from  "./Attribute.js";
import _AuthUser from  "./AuthUser.js";
import _AuthUserRole from  "./AuthUserRole.js";
import _Book from  "./Book.js";
import _Boundary from  "./Boundary.js";
import _Comment from  "./Comment.js";
import _Coordinate from  "./Coordinate.js";
import _CustomAttraction from  "./CustomAttraction.js";
import _Marker from  "./Marker.js";
import _MarkerImage from  "./MarkerImage.js";
import _MarkerReview from  "./MarkerReview.js";
import _MarkerStatus from  "./MarkerStatus.js";
import _Painting from  "./Painting.js";
import _Quote from  "./Quote.js";
import _ReviewGlobal from  "./ReviewGlobal.js";
import _ReviewGlobalImage from  "./ReviewGlobalImage.js";
import _Role from  "./Role.js";
import _Section from  "./Section.js";
import _SectionAttribute from  "./SectionAttribute.js";
import _SectionImage from  "./SectionImage.js";
import _SectionType from  "./SectionType.js";
import _Sex from  "./Sex.js";
import _Song from  "./Song.js";
import _Tag from  "./Tag.js";

export default function initModels(sequelize) {
  var Article = _Article.init(sequelize, DataTypes);
  var ArticleImage = _ArticleImage.init(sequelize, DataTypes);
  var ArticleReview = _ArticleReview.init(sequelize, DataTypes);
  var ArticleStatus = _ArticleStatus.init(sequelize, DataTypes);
  var ArticleTag = _ArticleTag.init(sequelize, DataTypes);
  var Attraction = _Attraction.init(sequelize, DataTypes);
  var AttractionCategory = _AttractionCategory.init(sequelize, DataTypes);
  var Attribute = _Attribute.init(sequelize, DataTypes);
  var AuthUser = _AuthUser.init(sequelize, DataTypes);
  var AuthUserRole = _AuthUserRole.init(sequelize, DataTypes);
  var Book = _Book.init(sequelize, DataTypes);
  var Boundary = _Boundary.init(sequelize, DataTypes);
  var Comment = _Comment.init(sequelize, DataTypes);
  var Coordinate = _Coordinate.init(sequelize, DataTypes);
  var CustomAttraction = _CustomAttraction.init(sequelize, DataTypes);
  var Marker = _Marker.init(sequelize, DataTypes);
  var MarkerImage = _MarkerImage.init(sequelize, DataTypes);
  var MarkerReview = _MarkerReview.init(sequelize, DataTypes);
  var MarkerStatus = _MarkerStatus.init(sequelize, DataTypes);
  var Painting = _Painting.init(sequelize, DataTypes);
  var Quote = _Quote.init(sequelize, DataTypes);
  var ReviewGlobal = _ReviewGlobal.init(sequelize, DataTypes);
  var ReviewGlobalImage = _ReviewGlobalImage.init(sequelize, DataTypes);
  var Role = _Role.init(sequelize, DataTypes);
  var Section = _Section.init(sequelize, DataTypes);
  var SectionAttribute = _SectionAttribute.init(sequelize, DataTypes);
  var SectionImage = _SectionImage.init(sequelize, DataTypes);
  var SectionType = _SectionType.init(sequelize, DataTypes);
  var Sex = _Sex.init(sequelize, DataTypes);
  var Song = _Song.init(sequelize, DataTypes);
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
  Attraction.belongsTo(AttractionCategory, { as: "attraction_category", foreignKey: "attraction_category_id"});
  AttractionCategory.hasMany(Attraction, { as: "attractions", foreignKey: "attraction_category_id"});
  SectionAttribute.belongsTo(Attribute, { as: "attribute", foreignKey: "attribute_id"});
  Attribute.hasMany(SectionAttribute, { as: "section_attributes", foreignKey: "attribute_id"});
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
  Marker.belongsTo(Boundary, { as: "boundary", foreignKey: "boundary_id"});
  Boundary.hasMany(Marker, { as: "markers", foreignKey: "boundary_id"});
  Comment.belongsTo(Comment, { as: "parent", foreignKey: "parent_id"});
  Comment.hasMany(Comment, { as: "comments", foreignKey: "parent_id"});
  Marker.belongsTo(Coordinate, { as: "coordinate", foreignKey: "coordinate_id"});
  Coordinate.hasMany(Marker, { as: "markers", foreignKey: "coordinate_id"});
  Attraction.belongsTo(CustomAttraction, { as: "attraction_source", foreignKey: "attraction_source_id"});
  CustomAttraction.hasMany(Attraction, { as: "attractions", foreignKey: "attraction_source_id"});
  Section.belongsTo(Marker, { as: "marker", foreignKey: "marker_id"});
  Marker.hasMany(Section, { as: "sections", foreignKey: "marker_id"});
  Marker.belongsTo(MarkerImage, { as: "marker_image", foreignKey: "marker_image_id"});
  MarkerImage.hasMany(Marker, { as: "markers", foreignKey: "marker_image_id"});
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
    ArticleImage,
    ArticleReview,
    ArticleStatus,
    ArticleTag,
    Attraction,
    AttractionCategory,
    Attribute,
    AuthUser,
    AuthUserRole,
    Book,
    Boundary,
    Comment,
    Coordinate,
    CustomAttraction,
    Marker,
    MarkerImage,
    MarkerReview,
    MarkerStatus,
    Painting,
    Quote,
    ReviewGlobal,
    ReviewGlobalImage,
    Role,
    Section,
    SectionAttribute,
    SectionImage,
    SectionType,
    Sex,
    Song,
    Tag,
  };
}
