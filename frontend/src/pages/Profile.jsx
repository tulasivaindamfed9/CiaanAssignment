import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import Post from '../components/Post.jsx';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = id || currentUser?._id;
        if (!userId) return;

        const [userRes, postsRes] = await Promise.all([
          axios.get(`/api/users/${userId}`),
          axios.get(`/api/users/${userId}/posts`)
        ]);

        setProfileUser(userRes.data.data.user);
        setPosts(postsRes.data.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUser]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!profileUser) return <div className="text-center py-8">User not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            {profileUser.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ marginTop: '10px' ,color:'red'}}>
            <h1 className="text-2xl font-bold text-gray-800">{profileUser.name}</h1>
            <p className="text-gray-600">{profileUser.email}</p>
            {profileUser.bio && (
              <p className="mt-2 text-gray-700">{profileUser.bio}</p>
            )}
            {(!id || id === currentUser?._id) && (
              <Link
                to="/profile/edit"
                className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800"
              >
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;