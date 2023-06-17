import { FC } from 'react';

import styles from './UserInfo.module.scss';

const UserInfo: FC = () => {
  return (
    <section className={styles.profile}>
      <div className={styles.avatar}>АИ</div>
      <div className={styles.right_block}>
        <h1 className={styles.name}>Иван Иванов</h1>
        <ul className={styles.profile_folders}>
          <li className={styles.folder}>Telegram</li>
          <li className={styles.folder}>GitHub</li>
          <li className={styles.folder}>Resume</li>
        </ul>
      </div>
    </section>
  );
};

export { UserInfo };
