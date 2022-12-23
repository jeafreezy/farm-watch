import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { SiOpenstreetmap } from 'react-icons/si';
import { TAuthContext, useAuthContext } from '../../context/AuthProvider';
import CustomButton from '../ui/CustomButton';
import { Spinner } from '../ui/Spinner';

const UserProfile = () => {
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const {
        login,
        displayName,
        displayPicture,
        loading,
        isAuthenticated,
        logOut,
    } = useAuthContext() as TAuthContext;

    const handleProfileContainerClick = () => {
        setShowProfileInfo(!showProfileInfo);
    };
    const handleProfileInfoClick = (event: any) => {
        event.stopPropagation();
    };
    const handleAuthentication = () => {
        !isAuthenticated ? login() : logOut();
    };

    return (
        <div
            className={` relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-white`}
            onClick={handleProfileContainerClick}
        >
            {isAuthenticated && displayPicture && displayName ? (
                <img
                    src={displayPicture}
                    alt={` ${displayName}'s avatar`}
                    className="h-10 w-10 rounded-full"
                ></img>
            ) : (
                <CgProfile size={20} />
            )}

            {showProfileInfo ? (
                <div
                    className={`absolute  right-0 top-[58px] z-10 h-auto w-[200px] rounded-lg bg-brand-white shadow-xl`}
                    onClick={handleProfileInfoClick}
                >
                    <div className="flex flex-col gap-2 p-4 text-center">
                        <AiOutlineClose
                            size={20}
                            className="self-end rounded-lg  hover:bg-gray-300"
                            onClick={() => setShowProfileInfo(false)}
                        />
                        {displayName ? <span>Hi, {displayName}</span> : null}
                        <CustomButton
                            variant="primary"
                            action={handleAuthentication}
                            disabled={loading}
                        >
                            {!loading ? (
                                <SiOpenstreetmap />
                            ) : (
                                <Spinner text="" />
                            )}
                            {isAuthenticated ? 'Logout' : 'Login'}
                        </CustomButton>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default UserProfile;
