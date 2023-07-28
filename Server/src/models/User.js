const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID, // Tipo de dato hexadecimal
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // Genero el hexadecimal
      },
      username: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${this.email}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        get() {
          const rawValue = this.getDataValue("email");
          return rawValue ? rawValue.toUpperCase() : null;
        },
        validate: {
          isEmail: true,
          validadorPersonalizado(value) {
            if (value.length < 10) {
              throw new Error("Email must be at least 10 character long");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue("password", value.toUpperCase());
        },
      },
    },
    { timestamps: false }
  );
};
