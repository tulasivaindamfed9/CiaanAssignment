import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import Post from '../components/Post.jsx';
import PostForm from '../components/PostForm.jsx';

const Home = () => {
  
  const { user, loading: authLoading } = useAuth();
  console.log('Home component rendered');
  console.log('Home - user:', user, 'authLoading:', authLoading);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Home useEffect triggered');
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        console.log('Posts fetched:', res.data);
        setPosts(res.data.data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleCreatePost = async (content) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/posts',
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts([res.data.data.post, ...posts]);
    } catch (err) {
      console.error('Create post error:', err);
    }
  };
  

  // Show loading if auth is still being checked
  if (authLoading) {
    console.log('Home: Showing auth loading');
    return (
      <div className="max-w-2xl mx-auto">
        <div>Checking authentication...</div>
      </div>
    );
  }

  // if (loading) {
  //   console.log('Home: Showing posts loading, user:', user);
  //   return (
  //     <div className="max-w-2xl mx-auto">
  //       {/* Show PostForm if user is logged in, even while loading posts */}
  //       {user && (
  //         <div className="mb-8">
  //           <PostForm onSubmit={handleCreatePost} />
  //         </div>
  //       )}
  //       <div>Loading posts...</div>
  //     </div>
  //   );
  // }

  // console.log('Home: Rendering main content, user:', user, 'posts:', posts.length);

  return (
    <div className="max-w-2xl mx-auto">
      
      <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
       
        Posts count: {posts.length}
      </div>
      
      {/* Show PostForm if user is logged in */}
      {user && (
        <div className="mb-8">
          <PostForm onSubmit={handleCreatePost} />
        </div>
      )}
      <div className="mt-8 space-y-6">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;