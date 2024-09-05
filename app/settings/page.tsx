'use client';

import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const User = () => {
    const [currentUser, setCurrentUser] = useState({name: '', email: ''});
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:8080/auth/profile', {
                    headers: {Authorization: `Bearer ${Cookies.get('token')}`},
                });
                setCurrentUser(res.data);
                setName(res.data.name);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await axios.post('http://localhost:8080/auth/profile', {
                name,
                password,
            }, {
                headers: {Authorization: `Bearer ${Cookies.get('token')}`},
            });

            if (res.status === 201) {
                toast.success('Profile successfull');
                toast.loading('You will be logged out!', {duration: 2000});
                setTimeout(() => {
                    localStorage.clear()
                    Cookies.remove('token')
                    toast.success('You have been logged out!');
                    router.push('/');
                }, 2000)

            }
        } catch (error) {
            toast.error('Error')
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="lg:block h-full p-10 flex-col items-start justify-center">
            <div className="w-full bg-white shadow-md rounded p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <p className="mt-1 text-lg font-semibold">{currentUser.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <p className="mt-1 text-lg font-semibold">{currentUser.email}</p>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white shadow-md rounded p-8">
                <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 text-white font-bold ${
                                isSubmitting ? "bg-gray-400" : "bg-blue-600"
                            } rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default User;
