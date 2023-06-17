import { FC } from 'react';

import { UserInfo } from '../../simple/UserInfo';
import { Container } from '../../ui/Container';
import { UserForm } from '../../simple/UserForm';

import styles from './UserProfile.module.scss';




const UserProfile: FC = () => {
  return <main className={styles.user_profile}>
    <Container>
      <UserInfo />
      <UserForm />
    </Container>
  </main>;
};

export { UserProfile };