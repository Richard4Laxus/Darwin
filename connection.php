<?php
	class Connection{
		private $server="ec2-18-222-134-176.us-east-2.compute.amazonaws.com";
		private $user="root";
		private $password="vEHoDdK#q&h4D^8R4l$&";
		private $db="darwin";

		public function connect($server="",$user="",$password="",$db=""){
			if($server)
				$this->server=$server;
			if($user)
				$this->user=$user;
			if($password)
				$this->password=$password;
			if($db)
				$this->db=$db;

			$link=mysqli_connect($this->server,$this->user,$this->password) or die("Can't get access: " . mysqli_error($link));
			mysqli_select_db($link,$this->db) or die ("Can't select database");
			return $link;
		}		
	}	
?>