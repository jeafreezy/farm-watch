import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { SiOpenstreetmap } from 'react-icons/si';
import { useAuthContext } from '../../context/AuthContext';
import { TAuthContext } from '../../types';

type TUserProfile = {
    showPanel: boolean;
};

const UserProfile = ({ showPanel }: TUserProfile) => {
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
            className={`${
                !showPanel && 'right-3'
            }  relative  mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-black`}
            onClick={handleProfileContainerClick}
        >
            <div>
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
                        className={`${
                            !showPanel && 'right-2'
                        }  absolute -top-[108px] z-10 h-[100px] w-[200px] bg-brand-black `}
                        onClick={handleProfileInfoClick}
                    >
                        <div className="flex flex-col p-2 text-center">
                            <AiOutlineClose
                                size={15}
                                className="self-end"
                                onClick={() => setShowProfileInfo(false)}
                            />
                            <span>{displayName}</span>
                            <button
                                className="flex items-center justify-center bg-brand-black-medium p-2 hover:bg-brand-blue"
                                onClick={handleAuthentication}
                                disabled={loading}
                            >
                                {!loading ? (
                                    <SiOpenstreetmap />
                                ) : (
                                    <span className="mr-1 h-3 w-2 animate-spin bg-white"></span>
                                )}
                                {isAuthenticated ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default UserProfile;
