// LCALARAPN6DQB8Q6EFWFA4TH code for twilio
/*
exports.login = async (req, res) => {
    // Implement your user login logic here
    try {
        // Extract user data from req.body
        const { username, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the provided password matches the stored password
        if (password !== user.password) {
            return res.status(401).send('Invalid password');
        }
        
        res.json({ success: true, message: 'Login successful' });

        // If both checks pass, consider the user logged in
        // You can redirect to another page or send a success message
        //res.redirect('page'); // 

    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

router.get('/user/:id',(req,res)=>{
    res.send(`the id is`,req.params.id);
    res.render('profile,{id});
})
req,res: request and responce the request is made by the user and the responce is made by the server means i used res. when i have to send the user something 
req used where i have to request to the server 
*/
