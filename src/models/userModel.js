class UserModel {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.userType=user.userType ||'user';
  }
}
export default UserModel;