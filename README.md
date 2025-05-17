how to run this .
step 1 - (post)Signup -> Format {
    "username":"Rohit",
    "password":"Rohit"
}
step 2 - (post)Login -> Format{
    "username":"Rohit",
    "password":"Rohit
}
This is will return a token copy that token and then paste it in the authorization section with the bearer token 

step 3- (post)addTodo -> {
    {
        "data":"Your todo
    }
}
step 4- (get)seeTodo ->{
    sirf token bhejna hai response me todo show ho jayega
}
step 5 -(post)deleteTodo ->{
    "del":"Your todo"
}

step 6 - (post)admin ->{
    "username":"Aniket",
    "password":"Aniket"
    "del":"Rohit"
}
this will delete a particular todo of a person
