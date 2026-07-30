import fs from 'fs';

let content = fs.readFileSync('src/services/firebaseService.ts', 'utf-8');

const friendshipCode = `
  // ==========================================
  // FRIENDSHIP LOGIC
  // ==========================================
  
  public static async addFriend(userId: string, friendCode: string): Promise<boolean> {
    try {
      // friendCode could be uid or username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', friendCode));
      const qSnap = await getDocs(q);
      
      let friendId = friendCode;
      
      if (!qSnap.empty) {
        friendId = qSnap.docs[0].id;
      } else {
        const docRef = doc(db, 'users', friendCode);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
           return false; // Friend not found
        }
      }
      
      if (userId === friendId) return false;

      const friendshipId = userId < friendId ? \`\${userId}_\${friendId}\` : \`\${friendId}_\${userId}\`;
      const friendshipRef = doc(db, 'friendships', friendshipId);
      
      await setDoc(friendshipRef, {
        id: friendshipId,
        userId: userId,
        friendId: friendId,
        status: 'accepted', // Auto-accept for prototype
        createdAt: Date.now()
      }, { merge: true });
      
      return true;
    } catch (err) {
      console.warn('Error adding friend:', err);
      return false;
    }
  }

  public static subscribeToFriends(userId: string, callback: (friends: any[]) => void): () => void {
    try {
      const friendshipsRef = collection(db, 'friendships');
      const q1 = query(friendshipsRef, where('userId', '==', userId), where('status', '==', 'accepted'));
      const q2 = query(friendshipsRef, where('friendId', '==', userId), where('status', '==', 'accepted'));
      
      let friendsList = new Map();
      
      const handleSnapshot = async () => {
         const snap1 = await getDocs(q1);
         const snap2 = await getDocs(q2);
         const friendIds = new Set<string>();
         
         snap1.forEach(d => friendIds.add(d.data().friendId));
         snap2.forEach(d => friendIds.add(d.data().userId));
         
         if (friendIds.size === 0) {
            callback([]);
            return;
         }
         
         const users: any[] = [];
         for (const fid of Array.from(friendIds)) {
            const userDoc = await getDoc(doc(db, 'users', fid));
            if (userDoc.exists()) {
               users.push({ id: userDoc.id, ...userDoc.data() });
            }
         }
         callback(users);
      };
      
      handleSnapshot();
      // Polling or relying on one-time fetch for now
      return () => {};
    } catch (err) {
      console.warn('subscribeToFriends error:', err);
      callback([]);
      return () => {};
    }
  }

`;

content = content.replace('// ==========================================\n  // REAL-TIME CALL SIGNALING (FIRESTORE)\n  // ==========================================', friendshipCode + '\n  // ==========================================\n  // REAL-TIME CALL SIGNALING (FIRESTORE)\n  // ==========================================');

fs.writeFileSync('src/services/firebaseService.ts', content);
