<!-- Step 1, User data -->
<h5 class="my-4 b-b pb-2"><i class="icon fas fa-lock"></i> <span class="bold">Account</span> Information</h5>

<form method="post" action="wizard/post-form/" class="form form-account" name="form-account" id="form-step-0">
    <div class="form-group">
        <label for="account_username" class="small bold">User name</label>
        <input type="text" name="Account[username]" id="account_username" class="form-control" placeholder="Your user name" required>
    </div>

    <div class="form-group">
        <label for="account_email" class="small bold">Email address</label>
        <input type="email" name="Account[email]" id="account_email" class="form-control" placeholder="Valid email" required>
    </div>

    <div class="form-group">
        <label for="account_password" class="small bold">Password</label>
        <input type="password" name="Account[password]" id="account_password" class="form-control" placeholder="Password" required>
    </div>
</form>
