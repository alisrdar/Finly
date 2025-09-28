import {  useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { authService } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { LuMail, LuPen, LuLoader } from 'react-icons/lu'
import toast from 'react-hot-toast'

const ProfilePage = () => {
    // const [user, setUser] = useState<User | null>(null)
    const { user, setUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getUser();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                toast.error('Failed to load profile');
            }
        };

        fetchUser();
    }, []);

    const handleUploadImage = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = async (event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];

            if (!file) return;

            setIsUploading(true);

            try {
                const formData = new FormData();
                formData.append('image', file);

                console.log('Uploading file:', file.name, file.size); // Debug log

                const response = await authService.uploadImage(formData);

                console.log('Upload response:', response); // Debug log
                if (!user) throw new Error('User not found');

                setUser({...user, profileImageUrl: response.imageUrl});

                toast.success('Profile image updated successfully!');
                console.log(user); // Debug log

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error('Upload error:', error);

                // Better error messages
                if (error.response?.status === 401) {
                    toast.error('Please log in again');
                } else if (error.response?.status === 400) {
                    toast.error('Invalid file format');
                } else {
                    toast.error(error.response?.data?.message || 'Upload failed');
                }
            } finally {
                setIsUploading(false);
            }
        };

        fileInput.click();
    };

    return (
        <DashboardLayout activeMenu='/profile'>
            <div className='max-w-3xl mx-auto my-8 p-6 bg-card rounded-lg shadow-md'>
                {user ? (
                    <div className='space-y-6'>
                        <div className='flex flex-col items-center gap-4'>
                            {/* Profile Image with Upload Button */}
                            <div className='relative group'>
                                <div className='relative'>
                                    <img
                                        src={user.profileImageUrl || '/avatar_m-face.jpg'}
                                        alt='Profile'
                                        className='w-24 h-24 rounded-full object-cover border-4 border-primary/20
                                        group-hover:border-primary/40 transition-all duration-300'
                                    />

                                    {/* Loading overlay */}
                                    {isUploading && (
                                        <div className='absolute inset-0 bg-black/50 rounded-full 
                                                       flex items-center justify-center'>
                                            <LuLoader className='w-6 h-6 text-white animate-spin' />
                                        </div>
                                    )}
                                </div>

                                {/* Upload Button */}
                                <button
                                    onClick={handleUploadImage}
                                    disabled={isUploading}
                                    className='absolute -bottom-1 -right-1 p-2 bg-primary text-primary-foreground 
                                             rounded-full shadow-lg hover:bg-primary/90 
                                             hover:scale-110 active:scale-95
                                             transition-all duration-200
                                             disabled:opacity-50 disabled:cursor-not-allowed
                                             disabled:hover:scale-100'
                                    title='Upload new profile image'
                                    aria-label='Upload profile image'
                                >
                                    {isUploading ? (
                                        <LuLoader className='w-4 h-4 animate-spin' />
                                    ) : (
                                        <LuPen className='w-4 h-4' />
                                    )}
                                </button>
                            </div>

                            {/* User Info */}
                            <div className='text-center space-y-2'>
                                <h3 className='text-2xl font-bold text-foreground'>{user.fullName}</h3>
                                <div className='flex items-center justify-center gap-2 text-muted-foreground'>
                                    <LuMail className='w-4 h-4' />
                                    <span className='text-sm'>{user.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Profile Information */}
                        <div className='border-t pt-6'>
                            <h4 className='text-lg font-semibold mb-4 text-foreground'>Profile Information</h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-muted-foreground'>Full Name</label>
                                    <p className='text-base font-medium text-foreground'>{user.fullName}</p>
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-muted-foreground'>Email</label>
                                    <p className='text-base font-medium text-foreground'>{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center py-12'>
                        <div className='flex items-center gap-3'>
                            <LuLoader className='w-6 h-6 animate-spin text-primary' />
                            <p className='text-muted-foreground'>Loading profile...</p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default ProfilePage