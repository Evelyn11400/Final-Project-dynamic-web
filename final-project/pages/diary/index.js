import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../../styles/page.module.css";

export default function Diary({ userInformation }) {
  const [diaryContent, setDiaryContent] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchDiaries(currentUser.uid);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchDiaries = (userId) => {
    const q = query(
      collection(db, "diaries"),
      where("userId", "==", userId),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const diaryList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched diaries:", diaryList);
      setDiaries(diaryList);
    });

    return () => unsubscribe();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diaryContent.trim() || !user) return;

    try {
      await addDoc(collection(db, "diaries"), {
        content: diaryContent,
        date: Timestamp.fromDate(new Date()),
        userId: user.uid,
      });
      setDiaryContent("");
    } catch (error) {
      console.error("Error adding diary:", error);
    }
  };

  return (
    <div className={styles.diaryWrapper}>
      <div className={styles.welcome}>
        <p>Welcome back! {userInformation?.email}.</p>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              value={diaryContent}
              onChange={(e) => setDiaryContent(e.target.value)}
              placeholder="Write your diary here..."
              required
            />
          </div>
          <div>
            <button type="submit">Add Diary</button>
          </div>
        </form>
      </div>
      <div className={styles.post}>
        <ul>
          <h2>Past Dairies</h2>
          {diaries.length === 0 ? (
            <p>No Dairy found. Create your first dairy now!</p>
          ) : (
            diaries.map((diary) => (
              <li key={diary.id}>
                <div className={styles.content}>
                  <p>{diary.content}</p>
                </div>
                <h4>
                  {diary.date.toDate
                    ? diary.date.toDate().toLocaleString()
                    : new Date(diary.date).toLocaleString()}
                </h4>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
