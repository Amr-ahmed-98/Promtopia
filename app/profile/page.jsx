'use client';
import { useState, useEffect } from 'react';
// to know whether the user is logged in or not
import { useSession } from 'next-auth/react';
// to navigate to the Home page
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  // get the data from API
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (hasConfirmed) {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE',
      });
      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };
  // profile component will contain a name we want to know whose profile we are
  return (
    <Profile
      name='my'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
