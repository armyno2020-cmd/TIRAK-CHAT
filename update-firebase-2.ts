import fs from 'fs';

let content = fs.readFileSync('src/services/firebaseService.ts', 'utf-8');

const newMethod = `
  public static async getAllUsers(): Promise<any[]> {
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const users: any[] = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (err) {
      console.warn('getAllUsers error:', err);
      return [];
    }
  }
`;

content = content.replace(/public static async findUserByPhone/, newMethod + '\n  public static async findUserByPhone');

fs.writeFileSync('src/services/firebaseService.ts', content);
