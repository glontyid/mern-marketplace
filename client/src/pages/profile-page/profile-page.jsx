import React from 'react';
import AsideMenu from '../../components/aside/aside-menu';
import Profile from '../../components/profile/profile';
import './profile-page.scss';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <AsideMenu/>
      <Profile />
    </div>
  )
}

export default ProfilePage