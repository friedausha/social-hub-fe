import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');

    const fetchPosts = async (reset = false) => {
        let url = 'http://localhost:3000/posts?limit=5';
        if (cursor && !reset) {
            url += `&before=${cursor.before}&last_id=${cursor.last_id}`;
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPosts((prevPosts) => reset ? data.posts : [...prevPosts, ...data.posts]);
            setCursor(data.next_cursor);
            setHasMore(data.posts.length === 5);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
        });
        if (response.ok) {
            setIsDialogOpen(false);
            setNewPostTitle('');
            setNewPostContent('');
            fetchPosts(true); // Refresh posts
        } else {
            console.error('Error creating post');
        }
    };

    useEffect(() => {
        // Fetch posts when the component mounts
        fetchPosts(true);
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Posts
            </Typography>
            {localStorage.getItem('token') && (
                <Box textAlign="center" mb={2}>
                    <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
                        Create Post
                    </Button>
                </Box>
            )}
            {posts.map((post) => (
                <Box key={post.id} mb={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{post.title}</Typography>
                            <Typography>{post.content}</Typography>
                            <Typography color="textSecondary">{new Date(post.created_at).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
            {hasMore && (
                <Box textAlign="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => fetchPosts()}>
                        Load More
                    </Button>
                </Box>
            )}

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new post, please enter the title and content here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreatePost} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Posts;
