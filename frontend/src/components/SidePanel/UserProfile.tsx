import React from 'react';

type TUserProfile = {
    showPanel: boolean;
};
const UserProfile = ({ showPanel }: TUserProfile) => {
    return (
        <div
            className={`${
                showPanel && 'left-2'
            } absolute right-2  bottom-4 h-10 w-10 items-center rounded-full bg-brand-blue-light`}
        ></div>
    );
};

export default UserProfile;
