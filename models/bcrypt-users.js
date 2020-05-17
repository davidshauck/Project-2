const bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
  let BcryptUsers = sequelize.define("BcryptUsers", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$", "i"],
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      isUnique: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
      len: [2, 10]
    }
  });
  // generating a hash
  BcryptUsers.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valie
  BcryptUsers.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.localPassword);
  };
  return BcryptUsers;
};
