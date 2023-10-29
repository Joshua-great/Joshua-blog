
    function createBlog() {
        const blogData = {
            title: 'My Blog 1',
            description: 'First blog written by me',
           
        };

       
        axios.post('http://localhost:3001/joshuagreat_blogs/blogs', blogData)
            .then(response => {
               
                console.log('Blog creation success:', response.data);
              
                fetchBlogList();
            })
            .catch(error => {
               
                console.error('Error creating a blog:', error);
            });
    }

    
    document.getElementById('create-blog-button').addEventListener('click', createBlog);
        function editBlog(blogId) {
          
        }

        function deleteBlog(blogId) {
            axios.delete(`/Blogs/${blogId}`)
        .then(response => {
            
            fetchBlogList();
        })
        .catch(error => {
            
            console.error('Error deleting the blog:', error);
        });
        }
        function fetchUserProfile() {
          
    axios.get(`/Users/${userId}`)
        .then(response => {
           
            const userProfile = response.data;
           
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching user profile:', error);
        });
        }

  
        function fetchBlogList() {
            axios.get(`/Blogs/blogs${blogId}`)
        .then(response => {
            
            const blogList = response.data;
          
        })
        .catch(error => {
           
            console.error('Error fetching blog list:', error);
        });
            
        }

        
        fetchUserProfile();
        fetchBlogList();
