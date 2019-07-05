import * as bcrypt from 'bcrypt';

export interface RegData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

class UserStore {
  private users = new Map<number, UserData>();
  private emails = new Map<string, number>();

  constructor() {
    this.newUser({
      name: `Jane`,
      surname: `Smith`,
      email: `demo@britishpearl.com`,
      password: `demo`,
    });
  }

  public newUser(userData: RegData): false | number {
    if (this.emails.has(userData.email)) {
      return false;
    } else {
      const hash = bcrypt.hashSync(userData.password, 10);
      const userId = this.users.size + 1;
      this.emails.set(userData.email, userId);
      this.users.set(userId, {
        id: userId,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: hash,
      });
      return userId;
    }
  }

  // retrieve user from db by ID
  public getUserById(userId: number): undefined | UserData {
    return this.users.get(userId);
  }

  // retrieve user from db by email
  public getUserByEmail(userEmail: string): undefined | UserData {
    const userId = this.emails.get(userEmail);
    if (userId) {
      return this.getUserById(userId);
    } else {
      return undefined;
    }
  }
}

export default new UserStore();
